import socketio

sio = socketio.Client()

@sio.on('connect')
def handle_connect():
    print('Connected to server')

@sio.on('message')
def handle_message(data):
    print(data)

@sio.on('broadcast')
def handle_broadcast(data):
    print(data)

sio.connect('http://127.0.0.1:8081')

# message = input('What message would you like to send? \n')
# sio.emit('message', message)
# sio.emit('event')
sio.wait()