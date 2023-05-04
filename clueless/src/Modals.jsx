import React, { useState, useEffect } from 'react';
import './App.css';
import Draggable, {DraggableCore} from "react-draggable";

export function Action(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('action_request', (data) => {
                setOptions(data.options);
                setOpen(true);
            });
        }
    }, [props.socket]);

    function handleClick(opt) {
        if (props.socket) {
            props.socket.emit('select_action', opt);
            setOpen(false);
        }
    }

    function getOptions() {
        let opts = []
        for (let opt of options) {
            opts.push(<button 
                        className='modal-button'
                        onClick={() => handleClick(opt)}>
                            {opt}
                      </button>)
        }
        return opts
    }

    if (open) {
        return ( 
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div className='modal'>
                    <div className='modal-head'>
                        <text className='modal-title'>Select Action</text>
                    </div>
                    <div className='modal-body'>
                        {getOptions()}
                    </div>
                </div>
            </Draggable>
        ) 
    }
}

export function Move(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(['Test', 'Another', 'Cool']);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('move_request', (data) => {
                setOptions(data.options);
                setOpen(true);
            });
        }
    }, [props.socket]);

    function handleClick(opt) {
        if (props.socket) {
            props.socket.emit('select_movement', opt);
            setOpen(false);
        }
    }

    function getOptions() {
        let opts = []
        for (let opt of options) {
            opts.push(<button 
                        className='modal-button'
                        onClick={() => handleClick(opt)}>
                            {opt}
                      </button>)
        }
        return opts
    }

    if (open) {
        return ( 
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div className='modal'>
                    <div className='modal-head'>
                        <text className='modal-title'>Select Movement</text>
                    </div>
                    <div className='modal-body'>
                        {getOptions()}
                    </div>
                </div>
            </Draggable>
        ) 
    }
}

export function Suggestion(props) {
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState('Miss Scarlet');
    const [weapon, setWeapon] = useState('The CandleStick');

    useEffect(() => {
        if (props.socket) {
            props.socket.on('sugg_request', () => {
                setOpen(true);
            });
        }
    }, [props.socket]);

    function handleClick() {
        if (props.socket) {
            props.socket.emit('select_sugg', character, weapon);
            setOpen(false);
        }
    }

    if (open) {
        return ( 
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div className='modal'>
                    <div className='modal-head'>
                        <text className='modal-title'>Make a Suggestion</text>
                    </div>
                    <div className='modal-body'>
                        <label class="info" for="chars">Choose a Character:</label>
                        <div className='suggest'>
                            <select name="chars" id="chars" onChange={(e) => setCharacter(e.target.value)}>
                                <option value="Miss Scarlet">Miss Scarlet</option>
                                <option value="Colonel Mustard">Colonel Mustard</option>
                                <option value="Mrs. White">Mrs. White</option>
                                <option value="Mr. Green">Mr. Green</option>
                                <option value="Mrs. Peacock">Mrs. Peacock</option>
                                <option value="Professor Plum">Professor Plum</option>
                            </select>
                        </div>
                        <label class="info" for="weapons">Choose a Weapon:</label>
                        <div className='suggest'>
                            <select name="weapons" id="weapons" onChange={(e) => setWeapon(e.target.value)}>
                                <option value="The Candlestick">The Candlestick</option>
                                <option value="The Knife">The Knife</option>
                                <option value="The Lead Pipe">The Lead Pipe</option>
                                <option value="The Revolver">The Revolver</option>
                                <option value="The Rope">The Rope</option>
                                <option value="The Wrench">The Wrench</option>
                            </select>
                        </div>
                        <spacer style={{height: '3px'}} />
                        <button 
                            className='modal-button'
                            onClick={() => handleClick()}>
                                Make Suggestion
                        </button>
                    </div>
                </div>
            </Draggable>
        ) 
    }
}

export function Accusation(props) {
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState('Miss Scarlet');
    const [weapon, setWeapon] = useState('The CandleStick');
    const [room, setRoom] = useState('Study')
    
    useEffect(() => {
        if (props.socket) {
            props.socket.on('acc_request', () => {
                setOpen(true);
            });
        }
    }, [props.socket]);

    function handleClick() {
        if (props.socket) {
            props.socket.emit('select_acc', character, room, weapon);
            setOpen(false);
        }
    }
    
    if (open) {
        return ( 
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div className='modal' id='accusation'>
                    <div className='modal-head'>
                        <text className='modal-title'>Make an Accusation</text>
                    </div>
                    <div className='modal-body'>
                        <label class="info" for="chars">Choose a Character:</label>
                        <div className = 'suggest'>
                            <select name = "chars" id = "chars" onChange={(e) => setCharacter(e.target.value)}>
                                <option value = "Miss Scarlet">Miss Scarlet</option> 
                                <option value = "Colonel Mustard">Colonel Mustard</option>
                                <option value = "Mrs. White">Mrs. White</option>
                                <option value = "Mr. Green">Mr. Green</option>
                                <option value = "Mrs. Peacock">Mrs. Peacock</option>
                                <option value = "Professor Plum">Professor Plum</option>
                            </select>
                        </div>
                        <label class="info" for="weapons">Choose a Weapon:</label>
                        <div className = 'suggest'>
                            <select name = "weapons" id = "weapons" onChange={(e) => setWeapon(e.target.value)}>
                                <option value = "The Candlestick">The Candlestick</option> 
                                <option value = "The Knife">The Knife</option>
                                <option value = "The Lead Pipe">The Lead Pipe</option>
                                <option value = "The Revolver">The Revolver</option>
                                <option value = "The Rope">The Rope</option>
                                <option value = "The Wrench">The Wrench</option>
                            </select>
                        </div>
                        <label class="info" for="room">Choose a Room:</label>
                        <div className = 'suggest'>                           
                            <select name = "room" id = "room" onChange={(e) => setRoom(e.target.value)}>
                                <option value = "Study">Study</option> 
                                <option value = "Hall">Hall</option>
                                <option value = "Lounge">Lounge</option>
                                <option value = "Library">Library</option>
                                <option value = "Billiard Room">Billiard Room</option>
                                <option value = "Dining Room">Dining Room</option>
                                <option value = "Conservatory">Conservatory</option>
                                <option value = "Ballroom">Ballroom</option>
                                <option value = "Kitchen">Kitchen</option>
                            </select>
                        </div>
                        <spacer style={{height: '3px'}} />
                        <button className="modal-button"onClick={() => handleClick()}>Make Accusation</button>
                    </div>
                </div>
            </Draggable>
        ) 
    }
}

export function Disprove(props) {
    const [open, setOpen] = useState(false);
    const [card, setCard] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('disprove_request', (data) => {
                setOptions(data.options);
                setCard(data.options[1]);
                setOpen(true);
            });
        }
    }, [props.socket]);

    function handleClick() {
        if (props.socket) {
            console.log(card);
            props.socket.emit('select_disprove', card);
            setOpen(false);
        }
    }
    
    function getOptions() {
        let opts = []
        for (let opt of options) {
            opts.push(<option value={opt}>{opt}</option>)
        }
        return opts
    }

    if (open) {
        return ( 
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div className='modal' id='disprove'>
                    <div className='modal-head'>
                        <text className='modal-title'>Disprove the Suggestion</text>
                    </div>
                    <div className='modal-body'>
                        <label class="info" for="cards">Choose a Card:</label>
                        <div className='suggest'>
                            <select name="cards" id="cards" onChange={(e) => setCard(e.target.value)}>
                                {getOptions()}
                            </select>
                        </div>
                        <spacer style={{height: '3px'}} />
                        <button 
                            className='modal-button'
                            onClick={() => handleClick()}>
                                Confirm Disprove
                        </button>
                    </div>
                </div>
            </Draggable>
        ) 
    }
}