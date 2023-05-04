import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Main from './Main';

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://127.0.0.1:8081');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Main 
      socket={socket}
    />
  )
};

export default App;