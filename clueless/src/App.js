import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Main from './Main';

const App = () => {
  const [gameStart, setGameStart] = useState(true);
  const [character, setCharacter] = useState("");
  const [cards, setCards] = useState([]);
  // Use spread syntax to update this
  const [locations, setLoc] = useState({});
  // Use spread syntax to update this
  const [messages, setConsole] = useState([]);

  useEffect(() => {
    const socket = io('http://127.0.0.1:8081');

    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Main 
      gameStart={gameStart}
    />
  )
};

export default App;