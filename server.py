from flask import Flask, request
from flask_socketio import SocketIO, emit
import game

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

class Server():
    def __init__(self):
        self.num_clients = 0
        self.game_started = False
        self.usernames = {}
        self.confirmed = set()

    def handle_connect(self):
        self.num_clients += 1
        if self.num_clients > 6:
            self.emit_refuse(1, request.sid)
            return True
        if self.game_started:
            self.emit_refuse(2, request.sid)
            return True
        print(f'Client ({request.sid}) connected.')

    def handle_disconnect(self):
        self.num_clients -= 1
        if request.sid in self.usernames.keys():
            emit('server_msg', f'{self.usernames[request.sid]} has left the game.', broadcast=True)
            del self.usernames[request.sid]
        print(f'Client ({request.sid}) disconnected.')
        emit('user_list', list(self.usernames.values()), broadcast=True)

    def emit_refuse(self, num, sid):
        if num == 1:
            emit('server_msg', 'Sorry! There are already six players in the game. Please try again later.')
        else:
            emit('server_msg', 'Sorry! A game has already started. Please try again later.')
        emit('conn_refuse')

    # def handle_message(self, data):
    #     print(f'Received message from {self.usernames[request.sid]}: ' + data)
    #     emit('message', {'message': data, 'user': self.usernames[request.sid]}, broadcast=True)

    def handle_add_username(self, username):
        self.usernames[request.sid] = username
        emit('user_list', list(self.usernames.values()), broadcast=True)
        #emit('server_msg', f'{self.usernames[request.sid]} has entered the game.', broadcast=True)
        #emit('server_msg', f'Current players are: {", ".join(list(self.usernames.values()))}\n', broadcast=True)

        if len(self.usernames) > 2:
            for sid in self.usernames.keys():
                if sid not in self.confirmed:
                    emit('start_request', room=sid)

    def start_game(self):
        # if res.upper().strip() != 'START':
        #     emit('start_request')
        #     return
 
        self.confirmed.add(self.usernames[request.sid])
        if len(self.confirmed) == len(self.usernames):
            #emit('server_msg', 'Starting game...', broadcast=True)
            emit('game_start', broadcast=True)
            self.game = game.Game(self.usernames, self)
            self.game_started = True

    def emit_game_intro(self):
        text = 'Welcome to Clue-Less, a digital version of the classic board game Clue! Get ready \
to immerse yourself in a thrilling murder mystery where you\'ll need to use your detective skills \
to solve the crime. Explore the luxurious mansion and gather clues to figure out who did it, \
with what weapon, and in which room. But be careful, the murderer is still on the loose and \
may strike again! Are you ready to put on your thinking cap and solve the mystery? \
Let the game begin!'
        emit('server_msg', text, broadcast=True)

    def emit_new_turn(self, sid):
        emit('server_msg', f'It\'s {self.usernames[sid]}\'s turn!', broadcast=True)

    def emit_setup(self, sid, char: str, loc: str, cards: list):
        # text = f'Your character is: {char}.\nYour cards are: {", ".join(cards)}\nYou are currently located in {loc}.\n'
        # emit('server_msg', text, room=sid)
        emit('cards', cards, room=sid)
        emit('character', char, room=sid)

    def end_game(self):
        self.game = None
        self.game_started = False

    # Location should be a string
    # Cards should be a list of strings
    # Options should be a list of strings (move character, make a suggestion, make an accusation)
    def request_action(self, sid, can_move, can_suggest):
        options = []
        if can_move:
            options.append('Move your character')
        if can_suggest:
            options.append('Make a suggestion')
        options.extend(('Make an accusation', 'End turn'))
        emit('action_request', {'options': options}, room=sid)

    def handle_select_action(self, selection):
        if selection == 'Move your character':
            self.request_move(self.game.get_move_options(), request.sid)
        elif selection == 'Make a suggestion':
            self.request_suggestion(request.sid)
        elif selection == 'Make an accusation':
            self.request_accusation(request.sid)
        else:
            self.game.end_turn()
        
    def request_move(self, moves, sid):
        emit('move_request', {'options': moves}, room=sid)

    def handle_movement(self, selection):
        if selection.startswith('Take'):
            self.game.make_move('secret')
        else:
            direction = selection.split(' ')[1]
            self.game.make_move(direction)

    def request_suggestion(self, sid):
        char_options = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Mrs. Peacock', 'Professor Plum']
        weap_options = ['The Candlestick', 'The Knife', 'The Lead Pipe', 'The Revolver', 'The Rope', 'The Wrench']
        emit('sugg_request', {'char_options': char_options, 'weap_options': weap_options}, room=sid)

    def handle_suggestion(self, suspect, weapon):
        self.game.make_suggestion(suspect, weapon)

    def request_disprove(self, sid_dis, cards):
        emit('disprove_request', {'options': cards, 'user': self.usernames[self.game.cur_player.sid]}, room=sid_dis)
        
    def handle_disprove(self, card):
        text = f'Your suggestion was disproved by {self.usernames[request.sid]} with the following card: {card}.'
        emit('server_msg', text, room=self.game.cur_player.sid)
        self.emit_disprove(request.sid, self.game.cur_player.sid)

    def request_accusation(self, sid):
        char_options = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Mrs. Peacock', 'Professor Plum']
        weap_options = ['The Candlestick', 'The Knife', 'The Lead Pipe', 'The Revolver', 'The Rope', 'The Wrench']
        room_options = ["the Study", "the Hall", "the Lounge", "the Library", "the Billiard Room", "the Dining Room",
                        "the Conservatory", "the Ballroom", "the Kitchen"]
        emit('acc_request', {'char_options': char_options, 'weap_options': weap_options, 'room_options': room_options}, room=sid)

    def handle_accusation(self, suspect, room, weapon):
        self.game.make_accusation(suspect, weapon, room)

    def emit_movement(self, sid, character, location):
        emit('server_msg', f'{self.usernames[sid]} has moved {character} to {location}', broadcast=True)
        
    def emit_suggestion(self, sid, suspect, weapon, room):
        emit('server_msg', f'{self.usernames[sid]} has suggested {suspect}, in {room}, with {weapon}', broadcast=True)

    def emit_accusation(self, sid, suspect, weapon, room):
        emit('server_msg', f'{self.usernames[sid]} has accused {suspect}, in {room}, with {weapon}', broadcast=True)

    def emit_disprove(self, sid_disprove, sid_sugg):
        emit('server_msg', f'{self.usernames[sid_disprove]} has disproved the suggestion made by {self.usernames[sid_sugg]}.', broadcast=True)
        self.game.get_actions()

    def emit_no_disprove(self, sid_sugg):
        emit('server_msg', f'Mysterious! No one can disprove the suggestion made by {self.usernames[sid_sugg]}.', broadcast=True)
        self.game.get_actions()

    def emit_winner(self, sid, suspect, weapon, room):
        winner = self.usernames[sid]
        text = f'{winner} has guessed the case file correctly and won the game. Bravo!\n\
{winner} determined that {suspect} committed the crime, with {weapon}, in {room}.\n\
Thanks for playing!'
        emit('server_msg', text, broadcast=True)

    # Cards should be a list of strings
    def emit_loser(self, sid):
        loser = self.usernames[sid]
        text = f'Unfortunately, {loser} failed to guess the case file correctly. \
They will be removed from the game. It\'s up to the remaining players to solve the mystery \
before it\'s too late!\n'
        emit('server_msg', text, broadcast=True)

def create_server():
    # Create single instance of server
    server = Server()

    # SocketIO decorators
    socketio.on('connect')(server.handle_connect)
    socketio.on('disconnect')(server.handle_disconnect)
    #socketio.on('message')(server.handle_message)
    socketio.on('start_game')(server.start_game)
    socketio.on('add_username')(server.handle_add_username)
    #socketio.on('select_character')(server.handle_select_character)
    socketio.on('select_action')(server.handle_select_action)
    socketio.on('select_movement')(server.handle_movement)
    socketio.on('select_sugg')(server.handle_suggestion)
    socketio.on('select_disprove')(server.handle_disprove)
    socketio.on('select_acc')(server.handle_accusation)

    return server

# Port thing might be an issue. We will have to make sure that the server is using a port that isn't already taken.
if __name__ == '__main__':
    # Create the server
    server = create_server()

    # Run the app on local host with the given port
    socketio.run(app, host='127.0.0.1', port=8081)