import server
from player import Player, Suggestion, Card
from board import Board
import random
import player as p
from random import shuffle, randrange

class Game:
    def __init__(self, usernames: dict, server: server.Server):
        self.server = server
        self.num_players = len(usernames)
        self.end_game = 0
        self.turn_idx = 0
        # Dict to get username from sid
        self.usernames = usernames
        # Dict to get sid from username (so we can send messages to clients directly)
        self.sids = dict((reversed(item) for item in usernames.items()))
        self.start_game(usernames)

    def start_game(self, usernames: list):
        self.board = Board()
        self.players = self.create_players(list(usernames.values()))
        self.make_casefile()
        self.deal_cards()
        self.server.emit_game_intro()
        self.play_game()
        
    def create_players(self, usernames:list):
        players = []
        if (self.num_players < 3 or self.num_players > 6):
            # error checking? Or will the option to start a game be disabled with the improper number of players
            pass
        for i in range(self.num_players):
            players.append(Player(usernames[i], i, self.board.get_location(Card(7 + i).get_str())))
        return players

    def make_casefile(self):
        cards = []
        for i in range(1, 22):
            cards.append(Card(i))
        weapon = Card(randrange(1, 6))
        character = Card(randrange(7, 12))
        room = Card(randrange(13, 21))
        cards.remove(weapon)
        cards.remove(character)
        cards.remove(room)
        self.casefile = Suggestion(weapon, character, room, False)
        self.cards = cards

    def deal_cards(self):
        shuffle(self.cards)
        for idx, card in enumerate(self.cards):
            self.players[idx % self.num_players].add_card(card)

    def make_move(self, player: Player, new_loc, player_idx):
        self.board.move_character(player_idx, new_loc)
        player.set_loc(new_loc)
        player.last_suggested_room = None

    def can_suggest(self, player: Player):
        if not(self.board.is_room(player.loc)):
            return False
        if player.loc is player.last_suggested_room:
            return False
        return True

    def make_suggestion(self, player: Player, suggestion: Suggestion, player_idx: int):
        # server broadcasts suggestion was made
        self.make_move(self.players[suggestion.character - 7], self.board.room_locs[suggestion.room.get_str()])
        player.last_suggested_room = player.loc
        for i in range(self.num_players - 1):
            disproving_player = self.players[(player_idx + i + 1) % self.num_players]
            disproval_cards = suggestion.card_set.union(set(disproving_player.cards))
            if len(list(disproval_cards)) != 0:
                # server sends disproval cards
                # server shows suggesting player card
                # server broadcasts suggestion was disproved and by which player, but not the card
                break

    def make_accusation(self, player: Player, accusation: Suggestion):
        # server broadcasts accusation to all players
        if accusation.equals(self.casefile):
            # server broadcasts player has won, game ends.
            self.end_game = True
            return True
        else:
            # server broadcasts player has been removed from the game.
            player.removed = True
            return False

    def play_game(self):
        
        while not self.end_game:
            idx = self.turn_idx % self.num_players
            cur_player = self.players[idx]
            if cur_player.removed:
                self.turn_idx += 1
                continue
            
            can_suggest = False
            can_move = False

            moves = self.board.get_moves(cur_player)
            # are we using the right method here?
            self.server.request_action(self.sids[idx], cur_player, cur_player.loc, cur_player.cards, moves)
            if self.can_suggest():
                can_suggest = True
            if len(moves) > 0:
                can_move = True
            can_accuse = True

            while True:
                # Get the user's choice of action - this method still needs to be implmented
                user_choice = self.server.get_user_choice()
                if user_choice[0] is 1 and can_move:
                    self.make_move()
                    can_move = False
                elif user_choice[0] is 2 and can_suggest:
                    self.make_suggestion(cur_player, Suggestion(Card(user_choice[1]), Card(user_choice[2]), Card(user_choice[3]), False), idx)
                    can_suggest = False
                elif user_choice[0] is 3 and can_accuse:
                    self.make_accusation(cur_player, Suggestion(Card(user_choice[1]), Card(user_choice[2]), Card(user_choice[3]), True))
                    can_accuse = False
                    break
                elif user_choice[0] is 0:
                    # next turn
                    break
            
            self.turn_idx += 1

        #server broadcasts that the game has ended
        #server returns to start screen
