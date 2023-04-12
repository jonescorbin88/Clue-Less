const readline = require('readline');
const io = require('socket.io-client');

const SERVER_URL = 'http://127.0.0.1:8081';

const socket = io(SERVER_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user for a username
socket.on('username_request', () => {
  rl.question("Please enter a username: ", username => {
    socket.emit('add_username', username);
  });
});

// Prompt user to select a character
socket.on('character_request', (data) => {
  console.log('Select a character:');
  for (let i = 0; i < data.characters.length; i++) {
    console.log(`${i + 1}: ${data.characters[i]}`);
  }
  rl.question("Enter a number to select a character: ", selection => {
    socket.emit('select_character', data.characters[selection - 1]);
  });
});

// Prompt user to choose a game action
socket.on('request_action', (data) => {
  console.log('It\'s your turn!\nPlease select a game action:');
  for (let i = 0; i < data.options.length; i++) {
    console.log(`${i + 1}: ${data.options[i]}`);
  }
  rl.question("Enter a number to select a game action: ", selection => {
    socket.emit('select_action', data.options[selection - 1]);
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