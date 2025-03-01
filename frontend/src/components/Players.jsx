// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Players = ({ player }) => {
//     return (
//         <Card className='my-3 p-3 rounded'>
//           <Link to={`/player/${player._id}`}>
//             <Card.Img src={player.image} variant='top' className="card-img-top" />
//           </Link>
    
//           <Card.Body>
//             <Link to={`/player/${player._id}`}>   
//               <Card.Title as='div'>
//                 <strong>{player.name}</strong>
//               </Card.Title>
//             </Link>
    
//             <Card.Text as='h3'>Overall Rating: {player.overall_rating}</Card.Text>

//           </Card.Body>
//         </Card>
//       );
// }

// export default Players



import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Players = ({ player }) => {
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const width = card.clientWidth;
        const height = card.clientHeight;
        const xVal = e.nativeEvent.offsetX;
        const yVal = e.nativeEvent.offsetY;
        const yRotation = 20 * ((xVal - width / 2) / width);
        const xRotation = -20 * ((yVal - height / 2) / height);
        const transformString = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        setTransform(transformString);
    };

    const handleMouseOut = () => {
        setTransform('perspective(500px) scale(1) rotateX(0) rotateY(0)');
    };

    const handleMouseDown = () => {
        setTransform('perspective(500px) scale(0.9) rotateX(0) rotateY(0)');
    };

    const handleMouseUp = () => {
        setTransform('perspective(500px) scale(1.1) rotateX(0) rotateY(0)');
    };

    return (
        <Card
            className='my-3 p-3 rounded'
            style={{
                background: "linear-gradient(135deg, #670d0d,  #223a6a)",
                transform: transform,
                transition: 'transform 0.1s, box-shadow 0.1s',
                boxShadow: transform ? '0px 0px 30px rgba(0,0,0, 0.6)' : 'none'
            }}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <Link to={`/player/${player._id}`}>
                <Card.Img src={player.image} variant='top' className="card-img-top" />
            </Link>

            <Card.Body>
                <Link to={`/player/${player._id}`}>
                    <Card.Title as='div'>
                        <strong style={{ color: "white" }}>{player.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='h3' style={{ color: "white" }}>Overall Rating: {player.overall_rating}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Players;
