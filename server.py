from flask import Flask, request
from flask_socketio import SocketIO, emit, disconnect
import game

app = Flask(__name__)
socketio = SocketIO(app)

class Server():
    def __init__(self):
        self.num_clients = 0
        self.game_started = False
        self.usernames = {}
        self.characters = ['Miss Scarlet', 'Ms. Peacock', 'Mrs. White', 'Mr. Green', 'Professor Plum', 'Colonel Mustard']

    def handle_connect(self):
        self.num_clients += 1
        if self.num_clients > 6:
            emit('server_msg', 'Sorry! There are already six players in the game. Please try again later.')
            disconnect()
            return False
        if self.game_started:
            emit('server_msg', 'Sorry! A game has already started. Please try again later.')
            disconnect()
            return False
        emit('server_msg', f'Welcome to Clue-Less! {self.num_clients} player(s) connected.')
        print(f'Client ({request.sid}) connected.')
        emit('username_request')

    def handle_disconnect(self):
        self.num_clients -= 1
        if request.sid in self.usernames.keys():
            del self.usernames[request.sid]
            emit('server_msg', f'{self.usernames[request.sid]} has left the game.', broadcast=True)
        print(f'Client ({request.sid}) disconnected.')

    def handle_message(self, data):
        print(f'Received message from {self.usernames[request.sid]}: ' + data)
        emit('message', {'message': data, 'user': self.usernames[request.sid]}, broadcast=True)

    def handle_add_username(self, username):
        if username.isspace() or not username:
            emit('username_request')
        elif username in self.usernames.values():
            emit('server_msg', 'Uh-oh! That username is already taken by another player.')
            emit('username_request')
        else:
            self.usernames[request.sid] = username
            emit('server_msg', f'{self.usernames[request.sid]} has entered the game.', broadcast=True)
            emit('character_request', {'characters': self.characters})

    def handle_select_character(self, selection):
        if selection not in self.characters:
            emit('server_msg', 'Uh-oh! You did not enter a valid number')
            emit('character_request', {'characters': self.characters})
        else:
            self.characters.remove(selection)

    # Options should be a list of strings (move character, make a suggestion, make an accusation)
    def request_action(self, sid, options):
        emit('action_request', {'options': options}, room=sid)

    def handle_select_action(self, selection):
        print(selection)

    def handle_movement(self, location):
        return True

    def handle_suggestion(self, suspect, weapon, room):
        return True

    def handle_accusation(self, suspect, weapon, room):
        return True

    def emit_movement(self, character, location):
        # fix logic here
        if True:
            emit('server_msg', f'{self.usernames[request.sid]} has moved {character} to {location}', broadcast=True)
        if True:
            emit('server_msg', f'{self.usernames[request.sid]} has moved {character} to the hallway', broadcast=True)
        
    def emit_suggestion(self, suspect, weapon, room):
        emit('server_msg', f'{self.usernames[request.sid]} has suggested {suspect}, in {room}, with {weapon}', broadcast=True)

    def emit_accusation(self, suspect, weapon, room):
        emit('server_msg', f'{self.usernames[request.sid]} has accused {suspect}, in {room}, with {weapon}', broadcast=True)


def create_server():
    # Create single instance of server
    server = Server()

    # SocketIO decorators
    socketio.on('connect')(server.handle_connect)
    socketio.on('disconnect')(server.handle_disconnect)
    socketio.on('message')(server.handle_message)
    socketio.on('event')(server.handle_connect)
    socketio.on('add_username')(server.handle_add_username)
    socketio.on('select_character')(server.handle_select_character)

    return server

# Port thing might be an issue. We will have to make sure that the server is using a port that isn't already taken.
if __name__ == '__main__':
    # Create the server
    server = create_server()

    # Run the app on local host with the given port
    socketio.run(app, host='127.0.0.1', port=8081)
