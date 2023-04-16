class Board:
    def __init__(self):
        self.board = [['the Study', '_h1', 'the Hall', '_h2', 'the Lounge'],
                      ['_h3', '_na_', '_h4', '_na_', '_h5'],
                      ['the Library', '_h6', 'the Billiard Room', '_h7', 'the Dining Room'],
                      ['_h8', '_na_', '_h9', '_na_', '_h10'],
                      ['the Conservatory', '_h11', 'the Ballroom', '_h12', 'the Kitchen']]
        self.char_locs = {
            'Miss Scarlet': (0, 3),
            'Professor Plum': (1, 0),
            'Colonel Mustard': (1, 4),
            'Ms. Peacock': (3, 0),
            'Mr. Green': (4, 1),
            'Mrs. White': (4, 3)
        }  
            
        self.room_locs = {
            "the Study": (0, 0),
            "the Hall": (2, 0),
            "the Lounge": (4, 0),
            "the Library": (0, 2),
            "the Billiard Room": (2, 2),
            "the Dining Room": (4, 2),
            "the Conservatory": (0, 4),
            "the Ballroom": (2, 4),
            "the Kitchen": (4, 4)
        }
        
    def index_2d(self, board, character):
        for i, x in enumerate(board):
            if character in x:
                return (i, x.index(character))
            
    def is_hallway(self, loc):
        return self.get_room_str(loc).startswith('_h')
    
    def is_not_room(self, loc):
        return self.get_room_str(loc).startswith('_n')

    def is_room(self, loc):
        return self.get_room_str(loc).startswith('the')
    
    def is_occupied(self, loc):
        return loc in self.char_locs.values()
    
    def get_location(self, character):
        return self.char_locs[character]
    
    def get_room_str(self, loc):
        return self.board[loc[0]][loc[1]]

    def move_up(self, character):
        loc = self.get_location(character)
        if loc[0] == 0:
            return False
        
        new_loc = (loc[0] - 1, loc[1])
        if self.is_not_room(new_loc):
            return False
        if self.is_hallway(new_loc):
            if self.is_occupied(new_loc):
                return False
            return 'Move up to the hallway.'
        
        return f'Move up to {self.get_room_str(new_loc)}.'
        
    def move_down(self, character):
        loc = self.get_location(character)
        if loc[0] == 4:
            return False
        
        new_loc = (loc[0] + 1, loc[1])
        if self.is_not_room(new_loc):
            return False
        if self.is_hallway(new_loc):
            if self.is_occupied(new_loc):
                return False
            return 'Move down to the hallway.'
        
        return f'Move down to {self.get_room_str(new_loc)}.'

    def move_left(self, character):
        loc = self.get_location(character)
        if loc[1] == 0:
            return False
        
        new_loc = (loc[0], loc[1] - 1)
        if self.is_not_room(new_loc):
            return False
        if self.is_hallway(new_loc):
            if self.is_occupied(new_loc):
                return False
            return 'Move left to the hallway.'
        
        return f'Move left to {self.get_room_str(new_loc)}.'

    def move_right(self, character):
        loc = self.get_location(character)
        if loc[1] == 4:
            return False
        
        new_loc = (loc[0], loc[1] + 1)
        if self.is_not_room(new_loc):
            return False
        if self.is_hallway(new_loc):
            if self.is_occupied(new_loc):
                return False
            return 'Move right to the hallway.'
        
        return f'Move right to {self.get_room_str(new_loc)}.'

    def move_diag(self, character):
        passages = {(0, 0): "the Kitchen",
                    (0, 4): "the Conservatory",
                    (4, 0): "the Lounge",
                    (4, 4): "the Study"}
        loc = self.get_location(character)

        if loc in passages.keys():
            return f'Take the secret passage to {passages[loc]}.'
        return False

    def get_moves(self, character):
        move_opts = [
            self.move_up(character),
            self.move_down(character),
            self.move_left(character),
            self.move_right(character),
            self.move_diag(character)
        ]
        moves = []

        for item in move_opts:
            if item:
                moves.append(item)

        return moves

    def move_character(self, character, new_loc):
        self.char_locs[character] = new_loc
