import server
from player import Player, Suggestion, Card
from board import Board
import random
import player as p
from random import shuffle, randrange

class Game:
    def __init__(self, usernames: list , server: server.Server):
        self.server = server
        self.num_players = len(usernames)
        self.end_game = 0
        self.turn_idx = 0
        self.start_game(usernames)
        # send a broadcast message to all the players the game has started

    def start_game(self, usernames: list):
        self.board = Board()
        self.players = self.create_players(usernames)
        self.make_casefile()
        self.deal_cards()
        
    def create_players(self, usernames:list):
        players = []
        if (self.num_players < 3 or self.num_players > 6):
            # error checking
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



    def play_game(self):
        
        while not self.end_game:
            cur_player = self.players[self.turn_idx]
            
            # need to figure out turn logic
            pass
