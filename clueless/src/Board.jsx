import React, { useEffect, useState } from 'react';
import './App.css';

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

// export default Board;

function Hallway2(locations) {
    for (const [k, v] of map) {
        if (v == [0, 3]) {
            return <div className="Miss-Scarlett"></div>
        }   
    }
    return null; 
}

function Board(props) {
    // Character Order is: Scarlet, Plum, Mustard, Peacock, Green, White
    const locationMap = new Map();
    locationMap.set('Miss Scarlet', [0,3]);
    locationMap.set('Professor Plum', [1,0]);
    locationMap.set('Colonel Mustard', [1,4]);
    locationMap.set('Ms. Peacock', [3,0]);
    locationMap.set('Mr. Green', [4,1]);
    locationMap.set('Mrs. White', [4,3]);

    const [locations, setLocations] = useState(locationMap);

    useEffect(() => {
        if (props.socket) {
            props.socket.on('make_move', (data) => {
                setLocations(new Map(locations.set(data.char, data.coord)));
                console.log(data.coord);
            });
        }
    },[props.socket]);


    function booleans(map) {
        retMap = new Map()

        Study = [0, 0];
        study = [];

        Hall = [0, 2];
        hall = [];

        Lounge = [0, 4];
        lounge = [];

        Library = [2, 0];
        library = [];

        Billiard = [2, 2];
        billiard = [];

        Dining = [2, 4];
        dining = [];

        Conservatory = [4, 0];
        conservatory = [];

        Ballroom = [4, 2];
        ballroom = [];

        Kitchen = [4, 4];
        kitchen = [];

        for (const [k, v] of map) {
            if ({v} == Study) {
                study.push({k});
            }
            if ({v} == Hall) {
                hall.push({k});
            }
            if ({v} == Lounge) {
                lounge.push({k});
            }
            if ({v} == Library) {
                library.push({k});
            }
            if ({v} == Billiard) {
                billiard.push({k});
            }
            if ({v} == Dining) {
                dining.push({k});
            }
            if ({v} == Conservatory) {
                conservatory.push({k});
            }
            if ({v} == Ballroom) {
                ballroom.push({k});
            }
            if ({v} == Kitchen) {
                kitchen.push({k});
            }       
        }       
        retMap.set('Study', study);
        retMap.set('Study', study);
        retMap.set('Study', study);
        retMap.set('Study', study);
        retMap.set('Study', study);
        retMap.set('Study', study);
        
    }

    return (
        <div className="board">
            <div className="row">
            {getRow1()}
                <div className="room">
                    <text className="room-label">Study</text>
                    <div className="passage" id="study-pass"></div>
                </div>
                <div className="hallway1"></div>
                <div className="room">
                    <text className="room-label">Hall</text>
                </div>
                <div className="hallway1">
                    
                    <div className="Miss-Scarlett"></div>
                </div>
                <div className="room">
                    <div className="passage" id="lounge-pass"></div>
                    <text className="room-label">Lounge</text>
                </div>
            </div>
            <div className="row">
                <div className="hallway2">
                    <div className="professor-plum"></div>
                </div>
                <div className="empty"></div>
                <div className="hallway2"></div>
                <div className="empty"></div>
                <div className="hallway2">
                    <div className="colonel-mustard"></div>
                </div>
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
                <div className="hallway2">
                    <div className="ms-peacock"></div>
                </div>
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
                <div className="hallway1">
                    <div className="mr-green"></div>
                </div>
                <div className="room">
                    <text className="room-label">Ballroom</text>
                </div>
                <div className="hallway1">
                    <div className="mrs-white"></div>
                </div>
                <div className="room">
                    <text className="room-label">Kitchen</text>
                    <div className="passage" id="kitchen-pass"></div>
                </div>
            </div>
        </div>
    ) 
}

export default Board;