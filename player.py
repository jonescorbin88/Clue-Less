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
    # CANDLESTICK = (1, 'the Candlestick')
    # KNIFE = (2, 'the Knife')
    # LEAD_PIPE = (3, 'the Lead Pipe')
    # REVOLVER = (4, 'the Revolver')
    # ROPE = (5, 'the Rope')
    # WRENCH = (6, 'the Wrench')

    # MISS_SCARLET = (7, 'Miss Scarlet')
    # COLONEL_MUSTARD = (8, 'Colonel Mustard')
    # MRS_WHITE = (9, 'Mrs. White')
    # MR_GREEN = (10, 'Mr. Green')
    # MRS_PEACOCK = (11, 'Ms. Peacock')
    # PROFESSOR_PLUM = (12, 'Professor Plum')

    # STUDY = (13, 'the Study')
    # HALL = (14, 'the Hall')
    # LOUNGE = (15, 'the Lounge')
    # LIBRARY = (16, 'the Library')
    # BILLIARD_ROOM = (17, 'the Billiard Room')
    # DINING_ROOM = (18, 'the Dining Room')
    # CONSERVATORY = (19, 'Conservatory')
    # BALLROOM = (20, 'Ballroom')
    # KITCHEN = (21, 'the Kitchen')

    # def get_by_num(num):
    #     for item in Card:
    #         if item.value[0] == num:
    #             return item
    
    # def get_by_str(str):
    #     for item in Card:
    #         if item.value[1] == str:
    #             return item

class Weapon(Card):
    CANDLESTICK = (1, 'the Candlestick')
    KNIFE = (2, 'the Knife')
    LEAD_PIPE = (3, 'the Lead Pipe')
    REVOLVER = (4, 'the Revolver')
    ROPE = (5, 'the Rope')
    WRENCH = (6, 'the Wrench')

    def get_by_num(num):
        for item in Weapon:
            if item.value[0] == num:
                return item
            
    def get_by_str(str):
        for item in Weapon:
            if item.value[1] == str:
                return item
            
    def get_type_str():
        return 'weapon'

class Character(Card):
    MISS_SCARLET = (7, 'Miss Scarlet')
    COLONEL_MUSTARD = (8, 'Colonel Mustard')
    MRS_WHITE = (9, 'Mrs. White')
    MR_GREEN = (10, 'Mr. Green')
    MRS_PEACOCK = (11, 'Ms. Peacock')
    PROFESSOR_PLUM = (12, 'Professor Plum')

    def get_by_num(num):
        for item in Character:
            if item.value[0] == num:
                return item
            
    def get_by_str(str):
        for item in Character:
            if item.value[1] == str:
                return item
            
    def get_type_str():
        return 'character'

class Room(Card):
    STUDY = (13, 'the Study')
    HALL = (14, 'the Hall')
    LOUNGE = (15, 'the Lounge')
    LIBRARY = (16, 'the Library')
    BILLIARD_ROOM = (17, 'the Billiard Room')
    DINING_ROOM = (18, 'the Dining Room')
    CONSERVATORY = (19, 'Conservatory')
    BALLROOM = (20, 'Ballroom')
    KITCHEN = (21, 'the Kitchen')

    def get_by_num(num):
        for item in Room:
            if item.value[0] == num:
                return item
            
    def get_by_str(str):
        for item in Room:
            if item.value[1] == str:
                return item
            
    def get_type_str():
        return 'room'

class Suggestion:

    def __init__(self, weapon: Weapon, room: Room, character: Character, isAccusation: bool):
        self.weapon = weapon
        self.room = room
        self.character = character
        self.isAccusation = isAccusation

    def equals(self, other):
        return self.weapon == other.weapon and self.room == other.room and self.character == other.character


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

    def __init__(self, username, num, loc):
        self.username = username
        self.character = Character.get_by_num(6 + num)
        self.loc = loc
        self.cards = []
        self.prev_turn = []
        self.curr_turn = []
        self.enabled = True

    def setCards(self, cards):
        self.cards = cards

    def setLoc(self, loc):
        self.loc = loc

    def takeTurn(self):
        pass

    def make_suggestion(self, weapon, room, character):
        sugg = Suggestion(weapon, room, character)
        self.curr_turn.append(sugg)

    def make_accusation(self, weapon, room, character):
        acc = Suggestion(weapon, room, character, isAccusation=True)

    def disable_player(self):
        self.prev_turn = []
        self.curr_turn = []
        self.enabled = False

    def end_turn(self):
        self.prev_turn = self.curr_turn
        self.curr_turn = []