import React, { useState, useEffect } from 'react';
import './App.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Action(props) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('server_msg', (msg) => {
            
            });
        }
    }, [props.socket]);

    function handleClose() {
        setOpen(false);
    };

    function getMessages() {
        // let msgs = [];
        // for (let msg of messages) {
        //     msgs.push(<text className='console-msgs'>{msg}</text>);
        //     msgs.push(<hr className='console-lines'/>);
        // }
        // return msgs;
    }

    return (
        <div className="centerpoint">
        <Dialog 
            open={open} 
            onClose={handleClose} 
            disableEnforceFocus
            disableScrollLock
        >
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
            {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            /> */}
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default Action;