import server
from player import Player, Suggestion, Card, card_map
from board import Board
import random
import player as p
from random import shuffle, randrange

class Game:
    def __init__(self, usernames: dict, server: server.Server):
        self.server = server
        self.num_players = len(usernames)
        self.turn_idx = 0
        # Dict to get username from sid
        self.usernames = usernames
        # List of characters associated with a player
        self.characters = []
        self.start_game(usernames)

    def start_game(self, usernames: dict):
        self.board = Board()
        self.players = self.create_players(usernames)
        self.make_casefile()
        self.deal_cards()
        self.play_game()
        
    def create_players(self, usernames: dict):
        players = [] 
        i = 0
        for key, val in usernames.items():
            players.append(Player(val, key, i, self.board.get_location(Card(7 + i).get_str())))
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
        self.casefile = Suggestion(weapon, room, character, False)
        print(self.casefile.weapon, self.casefile.room, self.casefile.character)
        self.cards = cards

    def deal_cards(self):
        shuffle(self.cards)
        for idx, card in enumerate(self.cards):
            self.players[idx % self.num_players].add_card(card)

    def can_suggest(self):
        if not(self.board.is_room(self.cur_player.loc)):
            return False
        if self.cur_player.loc == self.cur_player.last_suggested_room:
            return False
        if self.suggested:
            return False
        return True

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
        
        idx = 0
        self.cur_player = self.players[idx]
        self.server.emit_new_turn(self.cur_player.sid)
        self.moved = False
        self.suggested = False
        self.get_actions()

    def get_actions(self, ):
        can_suggest = False
        can_move = False

        moves = self.board.get_moves(self.cur_player.character.get_str())

        can_suggest = self.can_suggest()
        if len(moves) > 0 and not self.moved:
            can_move = True

        self.server.request_action(self.cur_player.sid, can_move, can_suggest)

    def get_move_options(self):
        return self.board.get_moves(self.cur_player.character.get_str())

    # Move a character that's connected to a player
    def make_move(self, direction):
        self.board.move_player(self.cur_player.character.get_str(), direction)
        self.cur_player.set_loc(self.board.get_location(self.cur_player.character.get_str()))
        self.cur_player.last_suggested_room = None
        self.moved = True
        self.server.emit_movement(self.cur_player.sid, 
                           self.cur_player.character.get_str(),
                           self.board.get_room_str(self.cur_player.loc),
                           self.cur_player.loc)
        self.get_actions()

    # Make suggestion
    def make_suggestion(self, character, weapon):
        suggestion = Suggestion(card_map[weapon], card_map[self.board.get_room_str(self.cur_player.loc)], card_map[character], False)
        self.suggested = True
        self.server.emit_suggestion(self.cur_player.sid,
                                    suggestion.character.get_str(),
                                    suggestion.weapon.get_str(),
                                    suggestion.room.get_str(),
                                    self.cur_player.loc)
                                    
        
        self.move_character(suggestion.character.get_str(), self.board.room_locs[suggestion.room.get_str()])
        self.cur_player.last_suggested_room = self.cur_player.loc
        for i in range(self.num_players - 1):
            idx = self.turn_idx % self.num_players
            disproving_player = self.players[(idx + i + 1) % self.num_players]
            disproval_cards = suggestion.card_set.intersection(set(disproving_player.cards))
            card_lst = []
            for card in disproval_cards:
                card_lst.append(card.get_str())
            
            if len(list(disproval_cards)) != 0:
                self.server.request_disprove(disproving_player.sid, card_lst)
                return
        # server notifies player nobody could disprove
        self.server.emit_no_disprove(self.cur_player.sid)

    # Move a character with a suggestion
    def move_character(self, char, new_loc):
        if (char in self.characters):
            player = None
            for plr in self.players:
                if plr.character.get_str() == char:
                    player = plr
            self.board.move_character(player.character.get_str(), new_loc)
            player.set_loc(self.board.get_location(player.character.get_str()))
        else:
            self.board.move_character(char, new_loc)

    def make_accusation(self, character, weapon, room):
        accusation = Suggestion(card_map[weapon], card_map[room], card_map[character], True)
        self.server.emit_accusation(self.cur_player.sid, 
                                    accusation.character.get_str(), 
                                    accusation.weapon.get_str(),
                                    accusation.room.get_str())
        if accusation.equals(self.casefile):
            # server broadcasts player has won, game ends.
            self.server.emit_winner(self.cur_player.sid,
                                    self.casefile.character.get_str(),
                                    self.casefile.weapon.get_str(),
                                    self.casefile.room.get_str())
            self.end_game()
            return
        else:
            # server broadcasts player has been removed from the game.
            self.server.emit_loser(self.cur_player.sid)
            self.cur_player.removed = True
            self.end_turn()

    # End current player's turn and switch to next active player
    def end_turn(self):
        self.turn_idx += 1
        idx = self.turn_idx % self.num_players
        self.cur_player = self.players[idx]
        if self.cur_player.removed:
            self.end_turn()
        else:
            self.moved = False
            self.suggested = False
            self.server.emit_new_turn(self.cur_player.sid)
            # cards = []
            # for card in self.cur_player.cards:
            #     cards.append(card.get_str())
            # self.server.emit_setup(self.cur_player.sid, 
            #                        self.cur_player.character.get_str(), 
            #                        self.board.get_room_str(self.cur_player.loc), 
            #                        cards)
            # Call to the server to prompt with actions
            self.get_actions()
            
    def end_game(self):
        self.server.end_game()
