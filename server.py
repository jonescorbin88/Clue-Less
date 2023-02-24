from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)

# Port thing might be an issue. We will have to make sure that the server is using a port that isn't already taken.
if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=8081)