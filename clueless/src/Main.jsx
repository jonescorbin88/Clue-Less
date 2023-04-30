import React from 'react';
import './App.css';
import logo from './group_logo.png';
import Board from './Board';

class Main extends React.Component {
    render() {
        return (
            <div>
                {this.props.gameStart ? (
                    <div>
                        <div className="container">
                            <div className="header">
                                <text className="title">CLUE-LESS</text>
                                <text className="subtitle">Can you solve the mystery?</text>
                                <img src={logo} alt="group logo"></img>
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
                    <div>
                        Game has not started.
                    </div>
                )}
            </div>
        );
    }
}

export default Main;