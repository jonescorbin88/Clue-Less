import React, { useEffect, useState } from 'react';
import './App.css';

// export default Board;

function Board(props) {
    // Character Order is: Scarlet, Plum, Mustard, Peacock, Green, White
    var missScarletStyle = {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'red',
        position: 'absolute',
        left: '57.7%',
        top: '12%',
        zIndex: 998,
    };

    var professorPlumStyle = {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'purple',
        position: 'absolute',
        left: '29.5%',
        top: '30%',
        zIndex: 998,
    };
      
    var colonelMustardStyle = {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'yellow',
        position: 'absolute',
        left: '67.4%',
        top: '30%',
        zIndex: 998,
    };
      
    var msPeacockStyle = {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'blue',
        position: 'absolute',
        left: '29.5%',
        top: '64%',
        zIndex: 998,
    };
      
    var mrGreenStyle = {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundolor: 'green',
        position: 'absolute',
        left: '39%',
        top: '81%',
        zIndex: 998,
    };
      
    var mrsWhiteStyle = {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        left: '57.7%',
        top: '81%',
        zIndex: 998,
    };

    const [scarletStyle, setScarletStyle] = useState(missScarletStyle);
    const [plumStyle, setPlumStyle] = useState(professorPlumStyle);
    const [mustardStyle, setMustardStyle] = useState(colonelMustardStyle);
    const [peacockStyle, setPeacockStyle] = useState(msPeacockStyle);
    const [greenStyle, setGreenStyle] = useState(mrGreenStyle);
    const [whiteStyle, setWhiteStyle] = useState(mrsWhiteStyle);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('make_move', (data) => {
                if (data.char == 'Miss Scarlet') {
                    if ( data.coord[0] == 0 ) {
                        //missScarletStyle.top = '12%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, top: '12%' }));
                    } else if ( data.coord[0] == 1 ) {
                        //missScarletStyle.top = '30%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, top: '30%' }));
                    } else if ( data.coord[0] == 2 ) {
                        //missScarletStyle.top = '47%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, top: '47%' }));
                    } else if ( data.coord[0] == 3 ) {
                        //missScarletStyle.top = '64%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, top: '64%' }));
                    } else if ( data.coord[0] == 4 ) {
                        //missScarletStyle.top = '81%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, top: '81%' }));
                    }

                    if ( data.coord[1] == 0 ) {
                        //missScarletStyle.left = '29%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, left: '29.5%' }));
                    } else if ( data.coord[1] == 1 ) {
                        //missScarletStyle.left = '39%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, left: '39%' }));
                    } else if ( data.coord[1] == 2 ) {
                        //missScarletStyle.left = '48.5%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, left: '48.5%' }));
                    } else if ( data.coord[1] == 3 ) {
                        //missScarletStyle.left = '57.7%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, left: '57.7%' }));
                    } else if ( data.coord[1] == 4 ) {
                        //missScarletStyle.left = '67.4%';
                        setScarletStyle((scarletStyle) => ({ ...scarletStyle, left: '67.4%' }));
                    }
                } else if (data.char == 'Professor Plum') {
                    if ( data.coord[0] == 0 ) {
                        //missScarletStyle.top = '12%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, top: '12%' }));
                    } else if ( data.coord[0] == 1 ) {
                        //missScarletStyle.top = '30%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, top: '30%' }));
                    } else if ( data.coord[0] == 2 ) {
                        //missScarletStyle.top = '47%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, top: '47%' }));
                    } else if ( data.coord[0] == 3 ) {
                        //missScarletStyle.top = '64%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, top: '64%' }));
                    } else if ( data.coord[0] == 4 ) {
                        //missScarletStyle.top = '81%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, top: '81%' }));
                    }

                    if ( data.coord[1] == 0 ) {
                        //missScarletStyle.left = '29%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, left: '29.5%' }));
                    } else if ( data.coord[1] == 1 ) {
                        //missScarletStyle.left = '39%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, left: '39%' }));
                    } else if ( data.coord[1] == 2 ) {
                        //missScarletStyle.left = '48.5%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, left: '48.5%' }));
                    } else if ( data.coord[1] == 3 ) {
                        //missScarletStyle.left = '57.7%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, left: '57.7%' }));
                    } else if ( data.coord[1] == 4 ) {
                        //missScarletStyle.left = '67.4%';
                        setPlumStyle((plumStyle) => ({ ...plumStyle, left: '67.4%' }));
                    }
                } else if (data.char == 'Colonel Mustard') {
                    if ( data.coord[0] == 0 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, top:'12%'}));
                    } else if ( data.coord[0] == 1 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, top:'30%'}));
                    } else if ( data.coord[0] == 2 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, top:'47%'}));
                    } else if ( data.coord[0] == 3 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, top:'64%'}));
                    } else if ( data.coord[0] == 4 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, top:'81%'}));
                    }

                    if ( data.coord[1] == 0 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, left: '29.5%'}));
                    } else if ( data.coord[1] == 1 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, left: '39%'}));
                    } else if ( data.coord[1] == 2 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, left: '48.5%'}));
                    } else if ( data.coord[1] == 3 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, left: '57.7%'}));
                    } else if ( data.coord[1] == 4 ) {
                        setMustardStyle((mustardStyle) => ({...mustardStyle, left: '67.4%'}));
                    }
                } else if (data.char == 'Ms. Peacock') {
                    if ( data.coord[0] == 0 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, top: '12%'}));
                    } else if ( data.coord[0] == 1 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, top: '30%'}));
                    } else if ( data.coord[0] == 2 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, top: '47%'}));
                    } else if ( data.coord[0] == 3 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, top: '64%'}));
                    } else if ( data.coord[0] == 4 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, top: '81%'}));
                    }

                    if ( data.coord[1] == 0 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, left: '29.5%'}));
                    } else if ( data.coord[1] == 1 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, left: '39%'}));
                    } else if ( data.coord[1] == 2 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, left: '48.5%'}));
                    } else if ( data.coord[1] == 3 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, left: '57.7%'}));
                    } else if ( data.coord[1] == 4 ) {
                        setPeacockStyle((peacockStyle) => ({...peacockStyle, left: '67.4%'}));
                    }
                } else if (data.char == 'Mr. Green') {
                    if ( data.coord[0] == 0 ) {
                        //missScarletStyle.top = '12%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, top: '12%' }));
                    } else if ( data.coord[0] == 1 ) {
                        //missScarletStyle.top = '30%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, top: '30%' }));
                    } else if ( data.coord[0] == 2 ) {
                        //missScarletStyle.top = '47%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, top: '47%' }));
                    } else if ( data.coord[0] == 3 ) {
                        //missScarletStyle.top = '64%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, top: '64%' }));
                    } else if ( data.coord[0] == 4 ) {
                        //missScarletStyle.top = '81%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, top: '81%' }));
                    }

                    if ( data.coord[1] == 0 ) {
                        //missScarletStyle.left = '29%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, left: '29.5%' }));
                    } else if ( data.coord[1] == 1 ) {
                        //missScarletStyle.left = '39%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, left: '39%' }));
                    } else if ( data.coord[1] == 2 ) {
                        //missScarletStyle.left = '48.5%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, left: '48.5%' }));
                    } else if ( data.coord[1] == 3 ) {
                        //missScarletStyle.left = '57.7%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, left: '57.7%' }));
                    } else if ( data.coord[1] == 4 ) {
                        //missScarletStyle.left = '67.4%';
                        setGreenStyle((greenStyle) => ({ ...greenStyle, left: '67.4%' }));
                    }
                } else if (data.char == 'Mrs. White') {
                    if ( data.coord[0] == 0 ) {
                        //missScarletStyle.top = '12%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, top: '12%' }));
                    } else if ( data.coord[0] == 1 ) {
                        //missScarletStyle.top = '30%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, top: '30%' }));
                    } else if ( data.coord[0] == 2 ) {
                        //missScarletStyle.top = '47%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, top: '47%' }));
                    } else if ( data.coord[0] == 3 ) {
                        //missScarletStyle.top = '64%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, top: '64%' }));
                    } else if ( data.coord[0] == 4 ) {
                        //missScarletStyle.top = '81%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, top: '81%' }));
                    }

                    if ( data.coord[1] == 0 ) {
                        //missScarletStyle.left = '29%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, left: '29.5%' }));
                    } else if ( data.coord[1] == 1 ) {
                        //missScarletStyle.left = '39%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, left: '39%' }));
                    } else if ( data.coord[1] == 2 ) {
                        //missScarletStyle.left = '48.5%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, left: '48.5%' }));
                    } else if ( data.coord[1] == 3 ) {
                        //missScarletStyle.left = '57.7%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, left: '57.7%' }));
                    } else if ( data.coord[1] == 4 ) {
                        //missScarletStyle.left = '67.4%';
                        setWhiteStyle((whiteStyle) => ({ ...whiteStyle, left: '67.4%' }));
                    }
                }
                if ((data.coord[0] == 0 || data.coord[0] == 2 || data.coord[0] == 4) &&
                     (data.coord[1] == 0 || data.coord[1] == 2 || data.coord[1] == 4)) {
                        if (data.char == 'Miss Scarlet') {
                            //missScarletStyle.left = 'calc(' + missScarletStyle.left + ' - 50px)';
                            //missScarletStyle.top = 'calc(' + missScarletStyle.top + ' - 50px)';
                            setScarletStyle((scarletStyle) => ({ ...scarletStyle, left: 'calc(' + scarletStyle.left + ' - 50px)' }));
                            setScarletStyle((scarletStyle) => ({ ...scarletStyle, top: 'calc(' + scarletStyle.top + ' - 50px)' }));
                        } else if (data.char == 'Professor Plum') {
                            //professorPlumStyle.left = 'calc(' + professorPlumStyle.left + ' + 0px)';
                            //professorPlumStyle.top = 'calc(' + professorPlumStyle.top + ' - 50px)';
                            setPlumStyle((plumStyle) => ({ ...plumStyle, left: 'calc(' + plumStyle.left + ' + 0px)' }));
                            setPlumStyle((plumStyle) => ({ ...plumStyle, top: 'calc(' + plumStyle.top + ' - 50px)' }));
                        } else if (data.char == 'Colonel Mustard') {
                            //colonelMustardStyle.left = 'calc(' + colonelMustardStyle.left + ' + 50px)';
                            //colonelMustardStyle.top = 'calc(' + colonelMustardStyle.top + ' - 50px)';
                            setMustardStyle((mustardStyle) => ({ ...mustardStyle, left: 'calc(' + mustardStyle.left + ' + 50px)' }));
                            setMustardStyle((mustardStyle) => ({ ...mustardStyle, top: 'calc(' + mustardStyle.top + ' - 50px)' }));
                        } else if (data.char == 'Ms. Peacock') { 
                            //msPeacockStyle.left = 'calc(' + msPeacockStyle.left + ' - 50px)';
                            //msPeacockStyle.top = 'calc(' + msPeacockStyle.top + ' + 50px)';
                            setPeacockStyle((peacockStyle) => ({ ...peacockStyle, left: 'calc(' + peacockStyle.left + ' - 50px)' }));
                            setPeacockStyle((peacockStyle) => ({ ...peacockStyle, top: 'calc(' + peacockStyle.top + ' + 50px)' }));
                        } else if (data.char == 'Mr. Green') {
                            //mrGreenStyle.left = 'calc(' + mrGreenStyle.left + ' + 0px)';
                            //mrGreenStyle.top = 'calc(' + mrGreenStyle.top + ' + 50px)';
                            setGreenStyle((greenStyle) => ({ ...greenStyle, left: 'calc(' + greenStyle.left + ' + 0px)' }));
                            setGreenStyle((greenStyle) => ({ ...greenStyle, top: 'calc(' + greenStyle.top + ' - 50px)' }));
                        } else if (data.char == 'Mrs. White') {
                            //mrsWhiteStyle.left = 'calc(' + mrsWhiteStyle.left + ' + 50px)';
                            //mrsWhiteStyle.top = 'calc(' + mrsWhiteStyle.top + ' + 50px)';
                            setWhiteStyle((whiteStyle) => ({ ...whiteStyle, left: 'calc(' + whiteStyle.left + ' + 50px)' }));
                            setWhiteStyle((whiteStyle) => ({ ...whiteStyle, top: 'calc(' + whiteStyle.top + ' + 50px)' }));
                        }
        
                }
            });
        }
    },[props.socket]);

    return (
        <div className="board">
            <div className="miss-scarlett" style={scarletStyle}></div>
            <div className="professor-plum" style={plumStyle}></div>
            <div className="colonel-mustard" style={mustardStyle}></div>
            <div className="ms-peacock" style={peacockStyle}></div>
            <div className="mr-green" style={greenStyle}></div>
            <div className="mrs-white" style={whiteStyle}></div>
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

export default Board;







// function booleans(map) {
//     retMap = new Map()

//     Study = [0, 0];
//     study = [];

//     Hall = [0, 2];
//     hall = [];

//     Lounge = [0, 4];
//     lounge = [];

//     Library = [2, 0];
//     library = [];

//     Billiard = [2, 2];
//     billiard = [];

//     Dining = [2, 4];
//     dining = [];

//     Conservatory = [4, 0];
//     conservatory = [];

//     Ballroom = [4, 2];
//     ballroom = [];

//     Kitchen = [4, 4];
//     kitchen = [];

//     for (const [k, v] of map) {
//         if ({v} == Study) {
//             study.push({k});
//         }
//         if ({v} == Hall) {
//             hall.push({k});
//         }
//         if ({v} == Lounge) {
//             lounge.push({k});
//         }
//         if ({v} == Library) {
//             library.push({k});
//         }
//         if ({v} == Billiard) {
//             billiard.push({k});
//         }
//         if ({v} == Dining) {
//             dining.push({k});
//         }
//         if ({v} == Conservatory) {
//             conservatory.push({k});
//         }
//         if ({v} == Ballroom) {
//             ballroom.push({k});
//         }
//         if ({v} == Kitchen) {
//             kitchen.push({k});
//         }       
//     }       
//     retMap.set('Study', study);
//     retMap.set('Study', study);
//     retMap.set('Study', study);
//     retMap.set('Study', study);
//     retMap.set('Study', study);
//     retMap.set('Study', study);
    
// }



// function Hallway2(locations) {
//     for (const [k, v] of map) {
//         if (v == [0, 3]) {
//             return <div className="Miss-Scarlett"></div>
//         }   
//     }
//     return null; 
// }




// class Board extends React.Component {
//     render() {
//         return (
//             <div className="board">
//                 <div className="row">
//                     <div className="room">
//                         <text className="room-label">Study</text>
//                         <div className="passage" id="study-pass"></div>
//                     </div>
//                     <div className="hallway1"></div>
//                     <div className="room">
//                         <text className="room-label">Hall</text>
//                     </div>
//                     <div className="hallway1">
//                         <div className="miss-scarlett"></div>
//                     </div>
//                     <div className="room">
//                         <div className="passage" id="lounge-pass"></div>
//                         <text className="room-label">Lounge</text>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="hallway2">
//                         <div className="professor-plum"></div>
//                     </div>
//                     <div className="empty"></div>
//                     <div className="hallway2"></div>
//                     <div className="empty"></div>
//                     <div className="hallway2">
//                         <div className="colonel-mustard"></div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="room">
//                         <text className="room-label">Library</text>
//                     </div>
//                     <div className="hallway1"></div>
//                     <div className="room">
//                         <text className="room-label">Billiard<br></br>Room</text>
//                     </div>
//                     <div className="hallway1"></div>
//                     <div className="room">
//                         <text className="room-label">Dining<br></br>Room</text>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="hallway2">
//                         <div className="ms-peacock"></div>
//                     </div>
//                     <div className="empty"></div>
//                     <div className="hallway2"></div>
//                     <div className="empty"></div>
//                     <div className="hallway2"></div>
//                 </div>
//                 <div className="row">
//                     <div className="room">
//                         <text className="room-label" id="conservatory">Conservatory</text>
//                         <div className="passage" id="conserv-pass"></div>
//                     </div>
//                     <div className="hallway1">
//                         <div className="mr-green"></div>
//                     </div>
//                     <div className="room">
//                         <text className="room-label">Ballroom</text>
//                     </div>
//                     <div className="hallway1">
//                         <div className="mrs-white"></div>
//                     </div>
//                     <div className="room">
//                         <text className="room-label">Kitchen</text>
//                         <div className="passage" id="kitchen-pass"></div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }