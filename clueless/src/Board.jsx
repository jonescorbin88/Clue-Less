import React from 'react';
import './App.css';

class Board extends React.Component {
    render() {
        return (
            <div className="board">
                <div className="row">
                    <div className="room">
                        <text className="room-label">Study</text>
                        <div className="passage" id="study-pass"></div>
                    </div>
                    <div className="hallway1"></div>
                    <div className="room">
                        <text className="room-label">Hall</text>
                    </div>
                    <div className="hallway1"></div>
                    <div className="room">
                        <div className="passage" id="lounge-pass"></div>
                        <text className="room-label">Lounge</text>
                    </div>
                </div>
                <div className="row">
                    <div className="hallway2"></div>
                    <div className="empty"></div>
                    <div className="hallway2"></div>
                    <div className="empty"></div>
                    <div className="hallway2"></div>
                </div>
                <div className="row">
                    <div className="room">
                        <text className="room-label">Library</text>
                    </div>
                    <div className="hallway1"></div>
                    <div className="room">
                        <text className="room-label">Billiard<br></br>Room</text>
                    </div>
                    <div className="hallway1"></div>
                    <div className="room">
                        <text className="room-label">Dining<br></br>Room</text>
                    </div>
                </div>
                <div className="row">
                    <div className="hallway2"></div>
                    <div className="empty"></div>
                    <div className="hallway2"></div>
                    <div className="empty"></div>
                    <div className="hallway2"></div>
                </div>
                <div className="row">
                    <div className="room">
                        <text className="room-label" id="conservatory">Conservatory</text>
                        <div className="passage" id="conserv-pass"></div>
                    </div>
                    <div className="hallway1"></div>
                    <div className="room">
                        <text className="room-label">Ballroom</text>
                    </div>
                    <div className="hallway1"></div>
                    <div className="room">
                        <text className="room-label">Kitchen</text>
                        <div className="passage" id="kitchen-pass"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Board;