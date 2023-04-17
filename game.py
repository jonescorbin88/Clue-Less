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
        # List of characters associated with a player
        self.characters = []
        self.start_game(usernames)

    def start_game(self, usernames: list):
        self.board = Board()
        self.players = self.create_players(list(usernames.values()))
        self.make_casefile()
        self.deal_cards()
        self.play_game()
        
    def create_players(self, usernames:dict):
        players = [] 
        i = 0
        for key, val in usernames.items():
            players.append(Player(val, i, key, self.board.get_location(Card(7 + i).get_str())))
            self.characters.append(Card(7 + i).get_str())
            i += 1
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
        self.board.move_character(player.character.get_str(), new_loc)
        player.set_loc(new_loc)
        player.last_suggested_room = None

    def move_character(self, char, new_loc):
        self.board.move_character(char, new_loc)

    def can_suggest(self, player: Player):
        if not(self.board.is_room(player.loc)):
            return False
        if player.loc is player.last_suggested_room:
            return False
        return True

    def make_suggestion(self, player: Player, suggestion: Suggestion, player_idx: int):
        self.server.emit_suggestion(player.sid,
                                    suggestion.character.get_str(),
                                    suggestion.weapon.get_str(),
                                    suggestion.room.get_str())
        if (suggestion.character in self.characters):
            self.make_move(self.players[suggestion.character - 7], self.board.room_locs[suggestion.room.get_str()])
        else:
            self.move_character(suggestion.character.get_str(), self.board.room_locs[suggestion.room.get_str()])
        player.last_suggested_room = player.loc
        for i in range(self.num_players - 1):
            disproving_player = self.players[(player_idx + i + 1) % self.num_players]
            disproval_cards = suggestion.card_set.union(set(disproving_player.cards))
            if len(list(disproval_cards)) != 0:
                # server sends disproval cards to disproving player
                # server shows suggesting player disproval card
                # server broadcasts suggestion was disproved and by which player, but not the card
                return True
        # server notifies player nobody could disprove
        self.server.emit_no_disprove(player.sid)
        return False
 
    def make_accusation(self, player: Player, accusation: Suggestion):
        # server broadcasts accusation to all players
        self.server.emit_accusation(player.sid, 
                                    accusation.character.get_str(), 
                                    accusation.weapon.get_str(),
                                    accusation.room.get_str())
        if accusation.equals(self.casefile):
            # server broadcasts player has won, game ends.
            self.server.emit_winner(player.sid,
                                    self.casefile.character.get_str(),
                                    self.casefile.weapon.get_str(),
                                    self.casefile.room.get_str())
            self.end_game = True
            return True
        else:
            # server broadcasts player has been removed from the game.
            self.server.emit_loser(player.sid)
            player.removed = True
            return False

    def play_game(self):
        
        self.server.emit_game_intro()
        for player in self.players:
            player_cards = []
            for card in player.cards:
                player_cards.append(card.get_str())
            self.server.emit_setup(player.sid, 
                                   player.character.get_str(), 
                                   self.board.get_room_str(player.loc), 
                                   player_cards)
        
        while not self.end_game:
            idx = self.turn_idx % self.num_players
            cur_player = self.players[idx]
            if cur_player.removed:
                self.turn_idx += 1
                continue
            
            self.server.emit_new_turn(cur_player.sid)
            cards = []
            for card in cur_player.cards:
                cards.append(card.get_str())
            self.server.emit_setup(cur_player.sid, 
                                   cur_player.character.get_str(), 
                                   self.board.get_room_str(cur_player.loc), 
                                   cards)
            can_suggest = False
            can_move = False

            moves = self.board.get_moves(cur_player)
            # are we using the right method here?
            # self.server.request_action(self.sids[idx], cur_player, cur_player.loc, cur_player.cards, moves)
            if self.can_suggest():
                can_suggest = True
            if len(moves) > 0:
                can_move = True
            can_accuse = True

            while True:
                # Calculate this again as user may have moved into a room
                can_suggest = self.can_suggest()
                # Get the user's choice of action - this method still needs to be implmented
                user_choice = self.server.get_user_choice(can_move, can_suggest, can_accuse, moves)
                if user_choice[0] is 1 and can_move:
                    self.make_move(cur_player, user_choice[1], idx)
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
        self.server.end_game()
