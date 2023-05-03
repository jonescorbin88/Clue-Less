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
    const [open, setOpen] = useState(true);
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