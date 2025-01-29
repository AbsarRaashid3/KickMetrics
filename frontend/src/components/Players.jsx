import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Players = ({ player }) => {
    return (
        <Card className='my-3 p-3 rounded'>
          <Link to={`/player/${player._id}`}>
            <Card.Img src={player.image} variant='top' className="card-img-top" />
          </Link>
    
          <Card.Body>
            <Link to={`/player/${player._id}`}>
              <Card.Title as='div'>
                <strong>{player.name}</strong>
              </Card.Title>
            </Link>
    
            <Card.Text as='h3'>Overall Rating: {player.overall_rating}</Card.Text>

          </Card.Body>
        </Card>
      );
}

export default Players
