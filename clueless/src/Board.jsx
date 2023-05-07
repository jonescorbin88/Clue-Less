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
        writable: true,
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
        writable: true,
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
        writable: true,
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
        writable: true,
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
        writable: true,
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
        writable: true,
    };

    useEffect(() => {
        if (props.socket) {
            props.socket.on('make_move', (data) => {
                if (data.char == 'Miss Scarlet') {
                    if ( data.coord[0] == 0 ) {
                        missScarletStyle.top = '12%';
                        // copy = Object.assign({},missScarletStyle); //.top = '12%';
                        // copy.top = '12%'
                    } else if ( data.coord[0] == 1 ) {
                        missScarletStyle.top = '30%';
                    } else if ( data.coord[0] == 2 ) {
                        missScarletStyle.top = '47%';
                    } else if ( data.coord[0] == 3 ) {
                        missScarletStyle.top = '64%';
                    } else if ( data.coord[0] == 4 ) {
                        missScarletStyle.top = '81%';
                    }

                    if ( data.coord[1] == 0 ) {
                        missScarletStyle.left = '29%';
                    } else if ( data.coord[1] == 1 ) {
                        missScarletStyle.left = '39%';
                    } else if ( data.coord[1] == 2 ) {
                        missScarletStyle.left = '48.5%';
                    } else if ( data.coord[1] == 3 ) {
                        missScarletStyle.left = '57.7%';
                    } else if ( data.coord[1] == 4 ) {
                        missScarletStyle.left = '67.4%';
                    }
                } else if (data.char == 'Professor Plum') {
                    if ( data.coord[0] == 0 ) {
                        professorPlumStyle.top = '12%';
                    } else if ( data.coord[0] == 1 ) {
                        professorPlumStyle.top = '30%';
                    } else if ( data.coord[0] == 2 ) {
                        professorPlumStyle.top = '47%';
                    } else if ( data.coord[0] == 3 ) {
                        professorPlumStyle.top = '64%';
                    } else if ( data.coord[0] == 4 ) {
                        professorPlumStyle.top = '81%';
                    }

                    if ( data.coord[1] == 0 ) {
                        professorPlumStyle.left = '29%';
                    } else if ( data.coord[1] == 1 ) {
                        professorPlumStyle.left = '39%';
                    } else if ( data.coord[1] == 2 ) {
                        professorPlumStyle.left = '48.5%';
                    } else if ( data.coord[1] == 3 ) {
                        professorPlumStyle.left = '57.7%';
                    } else if ( data.coord[1] == 4 ) {
                        professorPlumStyle.left = '67.4%';
                    }
                } else if (data.char == 'Colonel Mustard') {
                    if ( data.coord[0] == 0 ) {
                        colonelMustardStyle.top = '12%';
                    } else if ( data.coord[0] == 1 ) {
                        colonelMustardStyle.top = '30%';
                    } else if ( data.coord[0] == 2 ) {
                        colonelMustardStyle.top = '47%';
                    } else if ( data.coord[0] == 3 ) {
                        colonelMustardStyle.top = '64%';
                    } else if ( data.coord[0] == 4 ) {
                        colonelMustardStyle.top = '81%';
                    }

                    if ( data.coord[1] == 0 ) {
                        colonelMustardStyle.left = '29%';
                    } else if ( data.coord[1] == 1 ) {
                        colonelMustardStyle.left = '39%';
                    } else if ( data.coord[1] == 2 ) {
                        colonelMustardStyle.left = '48.5%';
                    } else if ( data.coord[1] == 3 ) {
                        colonelMustardStyle.left = '57.7%';
                    } else if ( data.coord[1] == 4 ) {
                        colonelMustardStyle.left = '67.4%';
                    }
                } else if (data.char == 'Ms. Peacock') {
                    if ( data.coord[0] == 0 ) {
                        msPeacockStyle.top = '12%';
                    } else if ( data.coord[0] == 1 ) {
                        msPeacockStyle.top = '30%';
                    } else if ( data.coord[0] == 2 ) {
                        msPeacockStyle.top = '47%';
                    } else if ( data.coord[0] == 3 ) {
                        msPeacockStyle.top = '64%';
                    } else if ( data.coord[0] == 4 ) {
                        msPeacockStyle.top = '81%';
                    }

                    if ( data.coord[1] == 0 ) {
                        msPeacockStyle.left = '29%';
                    } else if ( data.coord[1] == 1 ) {
                        msPeacockStyle.left = '39%';
                    } else if ( data.coord[1] == 2 ) {
                        msPeacockStyle.left = '48.5%';
                    } else if ( data.coord[1] == 3 ) {
                        msPeacockStyle.left = '57.7%';
                    } else if ( data.coord[1] == 4 ) {
                        msPeacockStyle.left = '67.4%';
                    }
                } else if (data.char == 'Mr. Green') {
                    if ( data.coord[0] == 0 ) {
                        mrGreenStyle.top = '12%';
                    } else if ( data.coord[0] == 1 ) {
                        mrGreenStyle.top = '30%';
                    } else if ( data.coord[0] == 2 ) {
                        mrGreenStyle.top = '47%';
                    } else if ( data.coord[0] == 3 ) {
                        mrGreenStyle.top = '64%';
                    } else if ( data.coord[0] == 4 ) {
                        mrGreenStyle.top = '81%';
                    }

                    if ( data.coord[1] == 0 ) {
                        mrGreenStyle.left = '29%';
                    } else if ( data.coord[1] == 1 ) {
                        mrGreenStyle.left = '39%';
                    } else if ( data.coord[1] == 2 ) {
                        mrGreenStyle.left = '48.5%';
                    } else if ( data.coord[1] == 3 ) {
                        mrGreenStyle.left = '57.7%';
                    } else if ( data.coord[1] == 4 ) {
                        mrGreenStyle.left = '67.4%';
                    }
                } else if (data.char == 'Mrs. White') {
                    if ( data.coord[0] == 0 ) {
                        mrsWhiteStyle.top = '12%';
                    } else if ( data.coord[0] == 1 ) {
                        mrsWhiteStyle.top = '30%';
                    } else if ( data.coord[0] == 2 ) {
                        mrsWhiteStyle.top = '47%';
                    } else if ( data.coord[0] == 3 ) {
                        mrsWhiteStyle.top = '64%';
                    } else if ( data.coord[0] == 4 ) {
                        mrsWhiteStyle.top = '81%';
                    }

                    if ( data.coord[1] == 0 ) {
                        mrsWhiteStyle.left = '29%';
                    } else if ( data.coord[1] == 1 ) {
                        mrsWhiteStyle.left = '39%';
                    } else if ( data.coord[1] == 2 ) {
                        mrsWhiteStyle.left = '48.5%';
                    } else if ( data.coord[1] == 3 ) {
                        mrsWhiteStyle.left = '57.7%';
                    } else if ( data.coord[1] == 4 ) {
                        mrsWhiteStyle.left = '67.4%';
                    }
                }
                if (data.coord[0] == 0 || data.coord[0] == 2 || data.coord[0] == 4 ||
                     data.coord[1] == 0 || data.coord[1] == 2 || data.coord[1] == 4) {
                        if (data.char == 'Miss Scarlet') {
                            missScarletStyle.left = 'calc(' + missScarletStyle.left + ' - 50px)';
                            missScarletStyle.top = 'calc(' + missScarletStyle.top + ' - 50px)';
                        } else if (data.char == 'Professor Plum') {
                            professorPlumStyle.left = 'calc(' + professorPlumStyle.left + ' + 0px)';
                            professorPlumStyle.top = 'calc(' + professorPlumStyle.top + ' - 50px)';
                        } else if (data.char == 'Colonel Mustard') {
                            colonelMustardStyle.left = 'calc(' + colonelMustardStyle.left + ' + 50px)';
                            colonelMustardStyle.top = 'calc(' + colonelMustardStyle.top + ' - 50px)';
                        } else if (data.char == 'Ms. Peacock') {
                            msPeacockStyle.left = 'calc(' + msPeacockStyle.left + ' - 50px)';
                            msPeacockStyle.top = 'calc(' + msPeacockStyle.top + ' + 50px)';
                        } else if (data.char == 'Mr. Green') {
                            mrGreenStyle.left = 'calc(' + mrGreenStyle.left + ' + 0px)';
                            mrGreenStyle.top = 'calc(' + mrGreenStyle.top + ' + 50px)';
                        } else if (data.char == 'Mrs. White') {
                            mrsWhiteStyle.left = 'calc(' + mrsWhiteStyle.left + ' + 50px)';
                            mrsWhiteStyle.top = 'calc(' + mrsWhiteStyle.top + ' + 50px)';
                        }
                }
            });
        }
    },[props.socket]);

    return (
        <div className="board">
            <div className="miss-scarlett" style={missScarletStyle}></div>
            <div className="professor-plum" style={professorPlumStyle}></div>
            <div className="colonel-mustard" style={colonelMustardStyle}></div>
            <div className="ms-peacock" style={msPeacockStyle}></div>
            <div className="mr-green" style={mrGreenStyle}></div>
            <div className="mrs-white" style={mrsWhiteStyle}></div>
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