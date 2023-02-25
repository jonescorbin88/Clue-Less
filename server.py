from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)
num_clients = 0

@socketio.on('connect')
def handle_connect():
    global num_clients 
    num_clients += 1
    emit('message', f'Welcome to Clue-Less! {num_clients} player(s) connected.')
    print(f'Client ({request.sid}) connected.')

@socketio.on('disconnect')
def handle_disconnect():
    global num_clients 
    num_clients -= 1
    print(f'Client ({request.sid}) disconnected.')

@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)

@socketio.on('event')
def handle_event():
    emit('broadcast', 'This is a broadcast', broadcast=True)

# Port thing might be an issue. We will have to make sure that the server is using a port that isn't already taken.
if __name__ == '__main__':

    socketio.run(app, host='127.0.0.1', port=8081)