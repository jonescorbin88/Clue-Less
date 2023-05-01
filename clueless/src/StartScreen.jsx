import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './group_logo.png';

function StartScreen(props) {
    const [user, setUser] = useState('');
    const [inGame, setInGame] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [invalidMsg, setInvalidMsg] = useState('');
    const [usernames, setUsernames] = useState([])
    const [askStart, setAskStart] = useState(false)
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        if (props.socket) {
            props.socket.on('user_list', (users) => {
                setUsernames(users);
            });

            props.socket.on('start_request', () => {
                setAskStart(true);
            });
        }
    }, [props.socket]);

    function sendUser() {
        if (!user || /^\\s*$/.test(user)) {
            setInvalid(true);
            setInvalidMsg('Please enter a valid username.')
            return;
        } else if (usernames.includes(user)) {
            setInvalid(true);
            setInvalidMsg('Uh-oh! That username is already taken by another player.');
            return;
        } else {
            props.socket.emit('add_username', user);
            setInGame(true);
            setInvalid(false);
        }
    }

    function sendStart() {
        props.socket.emit('start_game');
        setConfirm(true);
    }

    function getUsers() {
        let userText = [];
        for (let u of usernames) {
            userText.push(<text className='info'>{u}</text>);
        }
        return userText;
    }

    return (
        <div className='start-screen'>
            <img className="img-start" src={logo} alt="group logo" />
            <text className='title'>CLUE-LESS</text>
            <hr />
            {inGame ? (
                <React.Fragment>
                    <text className='info'>You're in! Current Players:</text>
                    {getUsers()}
                    <spacer style={{height: '5px'}} />
                    {askStart ? (
                        <button disabled={confirm} onClick={sendStart}>Let's Play!</button>
                    ) : (
                        <spacer style={{height: '0px'}} />
                    )}
                    <spacer style={{height: '5px'}} />
                    {confirm ? (
                        <text className='info2'>Waiting for other players to confirm...</text>
                    ) : (
                        <spacer style={{height: '0px'}} />
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <text className='info'>Enter a username:</text>
                    <spacer style={{height: '5px'}} />
                    <input 
                        className='username' 
                        onInput={e => setUser(e.target.value)}
                    />
                    <spacer style={{height: '10px'}} />
                    <button onClick={sendUser}>Join the game!</button>
                    <spacer style={{height: '5px'}} />
                    {invalid ? (
                        <text className='error'>{invalidMsg}</text>
                    ) : (
                        <spacer style={{height: '0px'}} />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default StartScreen;