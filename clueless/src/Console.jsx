import React, { useState, useEffect } from 'react';
import './App.css';

function Console(props) {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    console.log(messages);

    useEffect(() => {
        if (props.socket) {
            function onMessage(msg) {
                setMessages(prev => [...prev, msg]);
                console.log(msg);
            }

            props.socket.on('server_msg', onMessage);
            
            return () => {
                props.socket.off('server_msg', onMessage);
            };
        }
    }, [props.socket]);

    function getMessages() {
        let msgs = [];
        for (let msg of messages) {
            msgs.push(<text className='console-msgs'>{msg}</text>);
            msgs.push(<hr className='console-lines'/>);
        }
        return msgs;
    }

    function handleClick() {
        props.socket.emit('player_msg', msg);
        setMsg("");
    }

    return (
        <div className="console">
            {getMessages()}
            <div className='user-msg'>
                <input 
                    className='user-msg-input' 
                    onInput={e => setMsg(e.target.value)}
                />
                <button className='msg-send' onClick={handleClick}>Send</button>
            </div>
        </div>
    );
}

export default Console;