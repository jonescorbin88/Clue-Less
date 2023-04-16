const readline = require('readline');
const io = require('socket.io-client');

const SERVER_URL = 'http://127.0.0.1:8081';

const socket = io(SERVER_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Disconnect and terminate process if server refuses connection
socket.on('conn_refuse', () => {
  socket.disconnect();
  process.exit();
});

// Prompt user for a username
socket.on('username_request', () => {
  rl.question("Please enter a username: ", username => {
    socket.emit('add_username', username);
  });
});

// Prompt user to start the game
socket.on('start_request', () => {
  rl.question('Enter START when you\'re ready to play!: ', res => {
    socket.emit('start_game', res);
  });
});

// // Prompt user to select a character
// socket.on('character_request', (data) => {
//   console.log('Select a character:');
//   for (let i = 0; i < data.characters.length; i++) {
//     console.log(`${i + 1}: ${data.characters[i]}`);
//   }
//   rl.question("Enter a number to select a character: ", selection => {
//     socket.emit('select_character', data.characters[selection - 1]);
//   });
// });

// Prompt user to choose a game action
socket.on('action_request', (data) => {
  console.log('Please select a game action:');
  for (let i = 0; i < data.options.length; i++) {
    console.log(`${i + 1}: ${data.options[i]}`);
  }
  valid;
  do {
    rl.question("Enter a number to select a game action: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        socket.emit('select_action', data.options[selection - 1]);
        valid = true;
      }
    });
  } while (!valid);
});

// Prompt user to choose a movement action
socket.on('move_request', (data) => {
  console.log('Where do you want to move?');
  for (let i = 0; i < data.options.length; i++) {
    console.log(`${i + 1}: ${data.options[i]}`);
  }
  valid;
  do {
    rl.question("Enter a number to select a movement: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        socket.emit('select_movement', data.options[selection - 1]);
        valid = true;
      }
    });
  } while (!valid);
});

// Prompt user to make a suggestion
socket.on('sugg_request', (data) => {
  console.log('Time to make a suggestion! Take your best guess on who did the crime, and with what weapon.');
  valid;
  suspect;
  weapon;

  console.log('First, choose a suspect:');
  for (let i = 0; i < data.char_options.length; i++) {
    console.log(`${i + 1}: ${data.char_options[i]}`);
  }

  do {
    rl.question("Enter a number to select a suspect: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.char_options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        suspect = data.char_options[selection - 1];
        valid = true;
      }
    });
  } while (!valid);

  console.log('Now, choose a weapon:');
  for (let i = 0; i < data.weap_options.length; i++) {
    console.log(`${i + 1}: ${data.weap_options[i]}`);
  }

  do {
    rl.question("Enter a number to select a weapon: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.weap_options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        weapon = data.weap_options[selection - 1];
        valid = true;
      }
    });
  } while (!valid);

  socket.emit('select_sugg', suspect, weapon);
});

// Prompt user to choose a card to disprove a suggestion
socket.on('disprove_request', (data) => {
  console.log(`You can disprove the suggestion. Please choose a card to show ${data.user}:`);
  for (let i = 0; i < data.options.length; i++) {
    console.log(`${i + 1}: ${data.options[i]}`);
  }

  valid;
  do {
    rl.question("Enter a number to select a card: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.options.length) {
        console.log('Uh-oh! You did not enter a valid option.');
        valid = false;
      } else {
        socket.emit('select_disprove', card);
        valid = true;
      }
    });
  } while (!valid);
});

// Prompt user to make an accusation
socket.on('acc_request', (data) => {
  console.log('It\'s the moment of truth! You have chosen to make an accusation. If you guess correctly, ' +
  'you win the game! If you do not, you will no longer be able to move your character, make suggestions, or ' +
  'make another accusation. You will be able to disprove suggestions made by other players. Take your best ' +
  'guess on who did the crime, where, and with what weapon.');
  valid;
  suspect;
  room;
  weapon;

  console.log('First, choose a suspect:');
  for (let i = 0; i < data.char_options.length; i++) {
    console.log(`${i + 1}: ${data.char_options[i]}`);
  }

  do {
    rl.question("Enter a number to select a suspect: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.char_options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        suspect = data.char_options[selection - 1];
        valid = true;
      }
    });
  } while (!valid);

  console.log('Next, choose a room:');
  for (let i = 0; i < data.room_options.length; i++) {
    console.log(`${i + 1}: ${data.room_options[i]}`);
  }

  do {
    rl.question("Enter a number to select a room: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.room_options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        room = data.room_options[selection - 1];
        valid = true;
      }
    });
  } while (!valid);

  console.log('Finally, choose a weapon:');
  for (let i = 0; i < data.weap_options.length; i++) {
    console.log(`${i + 1}: ${data.weap_options[i]}`);
  }

  do {
    rl.question("Enter a number to select a weapon: ", selection => {
      if (parseInt(selection) < 0 || parseInt(selection) > data.weap_options.length) {
        console.log('Uh-oh! You did not enter a valid option.')
        valid = false;
      } else {
        weapon = data.weap_options[selection - 1];
        valid = true;
      }
    });
  } while (!valid);

  socket.emit('select_acc', suspect, room, weapon);
});

// Output messages from the server
socket.on('server_msg', (data) => {
  console.log(data);
});

// Read user input from the command line and send it to the server
rl.on('line', (input) => {
  readline.moveCursor(process.stdout, 0, -1);
  readline.clearScreenDown(process.stdout);
});

// Clean up the socket connection when the process exits
process.on('exit', () => {
  socket.disconnect();
});