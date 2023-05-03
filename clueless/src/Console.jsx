import React, { useState, useEffect } from 'react';
import './App.css';

function Console(props) {
    const [messages, setMessages] = useState(['Test', 'Another', 'Hello'])

    useEffect(() => {
        if (props.socket) {
            props.socket.on('server_msg', (msg) => {
                const newMsgs = [...messages, msg];
                setMessages(newMsgs);
            });
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

    return (
        <div className="console">
            {getMessages()}
        </div>
    );
}

export default Console;