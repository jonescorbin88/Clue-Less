from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

class Server():
    def __init__(self):
        self.num_clients = 0
        self.usernames = {}

    def handle_connect(self):
        self.num_clients += 1
        emit('server_msg', f'Welcome to Clue-Less! {self.num_clients} player(s) connected.')
        print(f'Client ({request.sid}) connected.')

    def handle_disconnect(self):
        self.num_clients -= 1
        print(f'Client ({request.sid}) disconnected.')
        emit('server_msg', f'{self.usernames[request.sid]} has left the chat.', broadcast=True)

    def handle_message(self, data):
        print(f'Received message from {self.usernames[request.sid]}: ' + data)
        emit('message', {'message': data, 'user': self.usernames[request.sid]}, broadcast=True)

    def handle_add_username(self, username):
        self.usernames[request.sid] = username
        emit('server_msg', f'{self.usernames[request.sid]} has entered the chat.', broadcast=True)

# Port thing might be an issue. We will have to make sure that the server is using a port that isn't already taken.
if __name__ == '__main__':
    # Create single instance of server
    server = Server()

    # SocketIO decorators
    socketio.on('connect')(server.handle_connect)
    socketio.on('disconnect')(server.handle_disconnect)
    socketio.on('message')(server.handle_message)
    socketio.on('event')(server.handle_connect)
    socketio.on('add_username')(server.handle_add_username)

    # Run the app on local host with the given port
    socketio.run(app, host='127.0.0.1', port=8081)