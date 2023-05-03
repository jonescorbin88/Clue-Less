import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './group_logo.png';
import Board from './Board';
import Console from './Console';
import StartScreen from './StartScreen';
import Action from './Modals';
import { StyledEngineProvider } from '@mui/material/styles';

function Main(props) {
    const [gameStart, setGameStart] = useState(true);
    const [cards, setCards] = useState([]);
    const [character, setCharacter] = useState('Mrs. Peacock');

    useEffect(() => {
        if (props.socket) {
            props.socket.on('cards', (cards) => {
                setCards(cards);
            });

            props.socket.on('character', (character) => {
                setCharacter(character);
            });
        }
    }, [props.socket]);

    function getCards(min, max) {
        let player_cards = [];
        const card_slice = cards.slice(min, max);
        for (let card of card_slice) {
            player_cards.push(<text className='info'>{card}</text>);
        }
        return player_cards;
    }

    return (
        <div>
            {gameStart ? (
                <React.Fragment>
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
                                <div className="card-list">
                                    {getCards(0, 3)}
                                </div>
                                <div className="card-list">
                                    {getCards(3, cards.length)}
                                </div>
                            </div>
                            <div className="player-char">
                                <text className="info">YOUR CHARACTER:</text>
                                <spacer style={{height: '5px'}} />
                                <text className="info">{character}</text>
                            </div>
                        </div>
                    </div>
                    <Console 
                        socket={props.socket}
                    />
                </React.Fragment>
            ) : (
                <StartScreen 
                    socket={props.socket}
                />
            )}
        </div>
    );
}

export default Main;