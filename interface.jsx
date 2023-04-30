import React, { useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  useEffect(() => {
    const socket = io('http://localhost:8081');

    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Hello, world!</div>;
};

export default App;