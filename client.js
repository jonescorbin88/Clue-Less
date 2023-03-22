const readline = require('readline');
const io = require('socket.io-client');

const SERVER_URL = 'http://127.0.0.1:8081'; // Replace with your server URL

const socket = io(SERVER_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on('connect', () => {
    console.log('Connection successful.')
})

// Listen for incoming messages from the server
socket.on('message', (data) => {
  console.log('Received message from server:', data);
});

socket.on('broadcast', (data) => {
    console.log('Received message from server:', data);
});

// Read user input from the command line and send it to the server
rl.on('line', (input) => {
  socket.emit('message', input);
  console.log('Sent message to server:', input);
});

// Clean up the socket connection when the process exits
process.on('exit', () => {
  socket.disconnect();
});
