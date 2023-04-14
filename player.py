from enum import Enum
from collections import defaultdict

from numpy import character

"""
The Card type is extended by the three types of cards in Clue: weapons, charcters, and rooms.
Each of the card types is implmeneted separately since they each are a different aspect of
the game.
"""
class Card(Enum):
    pass

class Weapon(Card):
    CANDLESTICK = 1
    KNIFE = 2
    LEAD_PIPE = 3
    REVOLVER = 4
    ROPE = 5
    WRENCH = 6

class Character(Card):
    MISS_SCARLET = 7
    COLONEL_MUSTARD= 8
    MRS_WHITE = 9
    MR_GREEN = 10
    MRS_PEACOCK = 11
    PROFESSOR_PLUM = 12

class Room(Card):
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

class Turn:
    def __init__(self):
        pass

class Location:
    def __init__(self, character: Character):
        start_loc = defaultdict(lambda: [-1,-1])
        start_loc[7] = [0,3]
        start_loc[8] = [1,4]
        start_loc[9] = [4,3]
        start_loc[10] = [4,1]
        start_loc[11] = [3,0]
        start_loc[12] = [1,0]

        self.location = start_loc[character.value]
        self.inRoom = False

    def getLocation(self)->list:
        return self.location

    def getRoom(self):
        board = [['Study', '_h1', 'Hall', '_h2', 'Lounge'],
                 ['_h3', '_na_', '_h4', '_na_', '_h5'],
                 ['Library', '_h6', 'Billiard', '_h7', 'Dining'],
                 ['_h8', '_na_', '_h9', '_na_', '_h10'],
                 ['Conservatory', '_h11', 'Ballroom', '_h12', 'Kitchen']
                 ]
        pass

    def getHall(self):
        pass

    def setLocation(self):
        pass

class Player:

    def __init__(self, username, num):
        self.username = username
        self.character = Character(6 + num)
        self.loc = Location(self.character)
        self.cards = []

    def setCards(self, cards):
        self.cards = cards

    def setLoc(self, loc):
        self.loc = loc

    def takeTurn(self):
        pass