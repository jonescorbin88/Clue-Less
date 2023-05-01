import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './group_logo.png';
import Board from './Board';
import StartScreen from './StartScreen';

function Main(props) {
    const [gameStart, setGameStart] = useState(false);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('game_start', () => {
                setGameStart(true);
            });
        }
    }, [props.socket]);

    return (
        <div>
            {gameStart ? (
                <div>
                    <div className="container">
                        <div className="header">
                            <text className="title">CLUE-LESS</text>
                            <text className="subtitle">Can you solve the mystery?</text>
                            <img className="img-main" src={logo} alt="group logo"></img>
                        </div>
                        <Board />
                        <div className="player-info">
                            <div className="player-cards">
                                <text className="info">YOUR<br></br>CARDS:</text>
                            </div>
                            <div className="player-char">
                                <text className="info">YOUR<br></br>CHARACTER:</text>
                            </div>
                        </div>
                    </div>
                    <div className="console">
                        <text className="info">Console</text>
                    </div>
                </div>
            ) : (
                <StartScreen 
                    socket={props.socket}
                />
            )}
        </div>
    );
}

export default Main;