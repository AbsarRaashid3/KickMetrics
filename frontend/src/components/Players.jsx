import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Players = ({ player }) => {
    return (
      <Card
      className="my-3 p-3 rounded"
      style={{
        width: "200px", // Fixed width for all cards
        height: "380px", // Fixed height for all cards
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Link to={`/player/${player._id}`}>
        <Card.Img
          src={player.image}
          variant="top"
          style={{
            height: "200px", // Image height
            objectFit: "cover", // Image fits properly without distortion
            width: "100%",
            borderRadius: "0.25rem",
          }}
        />
      </Link>
    
      <Card.Body
        style={{
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={`/player/${player._id}`}>
          <Card.Title
            as="div"
            style={{
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {player.name}
          </Card.Title>
        </Link>
    
        <Card.Text
          as="p"
          style={{
            fontSize: "0.9rem",
            textAlign: "center",
            color: "#555",
            margin: "0.5rem 0",
          }}
        >
          Overall Rating: {player.overall_rating}
        </Card.Text>
    
       
      </Card.Body>
    </Card>
    
    
    
    
      );
}

export default Players
