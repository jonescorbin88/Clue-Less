import socketio
from flask_socketio import send, emit

sio = socketio.Client()

@sio.on('connect')
def handle_connect():
    print('Connected to server')

sio.connect('http://127.0.0.1:8081')

message = input('What message would you like to send? \n')
sio.emit('message', message)
sio.wait()