from enum import Enum
from collections import defaultdict
from board import Board

from numpy import character

"""
The Card type is extended by the three types of cards in Clue: weapons, charcters, and rooms.
Each of the card types is implmeneted separately since they each are a different aspect of
the game.
"""
class Card(Enum):
    CANDLESTICK = 1
    KNIFE = 2
    LEAD_PIPE = 3
    REVOLVER = 4
    ROPE = 5
    WRENCH = 6

    MISS_SCARLET = 7
    COLONEL_MUSTARD = 8
    MRS_WHITE = 9
    MR_GREEN = 10
    MRS_PEACOCK = 11
    PROFESSOR_PLUM = 12

    STUDY = 13
    HALL = 14
    LOUNGE = 15
    LIBRARY = 16
    BILLIARD_ROOM = 17
    DINING_ROOM = 18
    CONSERVATORY = 19
    BALLROOM = 20
    KITCHEN = 21
        
    def get_str(self):
        return self._strings[self]

Card._strings = {
    Card.CANDLESTICK: "The Candlestick",
    Card.KNIFE: "The Knife",
    Card.LEAD_PIPE: "The Lead Pipe",
    Card.REVOLVER: "The Revolver",
    Card.ROPE: "The Rope",
    Card.WRENCH: "The Wrench",
    Card.MISS_SCARLET: "Miss Scarlet",
    Card.COLONEL_MUSTARD: "Colonel Mustard",
    Card.MRS_WHITE: "Mrs. White",
    Card.MR_GREEN: "Mr. Green",
    Card.MRS_PEACOCK: "Mrs. Peacock",
    Card.PROFESSOR_PLUM: "Professor Plum",
    Card.STUDY: "the Study",
    Card.HALL: "The Hall",
    Card.LOUNGE: "The Lounge",
    Card.LIBRARY: "The Library",
    Card.BILLIARD_ROOM: "The Billiard Room",
    Card.DINING_ROOM: "The Dining Room",
    Card.CONSERVATORY: "The Conservatory",
    Card.BALLROOM: "The Ballroom",
    Card.KITCHEN: "The Kitchen"
}

class Weapon(Enum):
    CANDLESTICK = 1
    KNIFE = 2
    LEAD_PIPE = 3
    REVOLVER = 4
    ROPE = 5
    WRENCH = 6

class Character(Enum):
    MISS_SCARLET = 7
    COLONEL_MUSTARD= 8
    MRS_WHITE = 9
    MR_GREEN = 10
    MRS_PEACOCK = 11
    PROFESSOR_PLUM = 12

    def str_by_num():
        pass
        

class Room(Enum):
    STUDY = 13
    HALL = 14
    LOUNGE = 15
    LIBRARY = 16
    BILLIARD_ROOM = 17
    DINING_ROOM = 18
    CONSERVATORY = 19
    BALLROOM = 20
    KITCHEN = 21

class Suggestion:

    def __init__(self, weapon: Weapon, room: Room, character: Character, isAccusation: bool):
        self.weapon = weapon
        self.room = room
        self.character = character
        self.isAccusation = isAccusation

    def equals(self, other):
        return self.weapon == other.weapon and self.room == other.room and self.character == other.character

class Turn:
    def __init__(self):
        pass

class Player:

    def __init__(self, username, num, loc):
        self.username = username
        self.character = Character(7 + num)
        self.cards = []
        self.prev_turn = []
        self.curr_turn = []
        self.enabled = True
        self.loc = loc

    def add_card(self, card):
        self.cards.append(card)

    def set_loc(self, loc):
        self.loc = loc

    def take_turn(self):
        pass