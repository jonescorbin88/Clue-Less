const readline = require('readline');
const io = require('socket.io-client');

const SERVER_URL = 'http://127.0.0.1:8081';

const socket = io(SERVER_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt for username after successful connection
socket.on('connect', () => {
  rl.question("Please enter a username: ", username => {
    socket.emit('add_username', username);
  });
});

// Output messages from the server
socket.on('server_msg', (data) => {
  console.log(data);
});

// Output chat messages coming from other clients
socket.on('message', (data) => {
  console.log(`${data.user}: ${data.message}`);
});

// Read user input from the command line and send it to the server
rl.on('line', (input) => {
  readline.moveCursor(process.stdout, 0, -1);
  readline.clearScreenDown(process.stdout);
  socket.emit('message', input);
});

// Clean up the socket connection when the process exits
process.on('exit', () => {
  socket.disconnect();
});