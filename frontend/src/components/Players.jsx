import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Players = ({ player }) => {
    const [transform, setTransform] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            const storedImage = localStorage.getItem(`image_${player.name}`);

            console.log(`Checking image for ${player.name}`);
            console.log(`DB Image: ${player.image_url}`);
            console.log(`Stored Image: ${storedImage}`);

            // ✅ Use DB image first
            if (player.image_url) {
                console.log(`Using DB image for ${player.name}`);
                setImage(player.image_url);
                return;
            }

            // ✅ Use LocalStorage image if available
            if (storedImage) {
                console.log(`Using cached image for ${player.name}`);
                setImage(storedImage);
                return;
            }

            // ✅ Only fetch if image is missing from both DB & LocalStorage
            setLoading(true);
            try {
                console.log(`Fetching image for ${player.name}`);
                const { data } = await axios.post('http://127.0.0.1:8000/fetch-image', {
                    playerName: player.name
                });

                if (data.image_url) {
                    console.log(`Fetched image: ${data.image_url}`);
                    setImage(data.image_url);
                    localStorage.setItem(`image_${player.name}`, data.image_url);

                    // ✅ Save image in DB
                    await axios.put(`/api/players/${player._id}/update-image`, {
                        image_url: data.image_url
                    });
                } else {
                    console.log(`No image found, using default.`);
                    setImage('/images/default.jpg');
                }
            } catch (error) {
                console.error(`Error fetching image for ${player.name}:`, error);
                setImage('/images/default.jpg');
            }
            setLoading(false);
        };

        fetchImage();
    }, [player.name, player.image_url, player._id]); // ✅ Dependencies ensure it only fetches when necessary

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const width = card.clientWidth;
        const height = card.clientHeight;
        const xVal = e.nativeEvent.offsetX;
        const yVal = e.nativeEvent.offsetY;
        const yRotation = 20 * ((xVal - width / 2) / width);
        const xRotation = -20 * ((yVal - height / 2) / height);
        setTransform(`perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`);
    };

    return (
        <Card
            className='my-3 p-3 rounded'
            style={{
                background: "linear-gradient(135deg, #670d0d, #223a6a)",
                transform: transform,
                transition: 'transform 0.1s, box-shadow 0.1s',
                boxShadow: transform ? '0px 0px 30px rgba(0,0,0, 0.6)' : 'none'
            }}
            onMouseMove={handleMouseMove}
            onMouseOut={() => setTransform('perspective(500px) scale(1) rotateX(0) rotateY(0)')}
            onMouseDown={() => setTransform('perspective(500px) scale(0.9) rotateX(0) rotateY(0)')}
            onMouseUp={() => setTransform('perspective(500px) scale(1.1) rotateX(0) rotateY(0)')}
        >
            <Link to={`/player/${player._id}`}>
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <Card.Img src={image} variant='top' className="card-img-top" />
                )}
            </Link>

            <Card.Body>
                <Link to={`/player/${player._id}`}>
                    <Card.Title as='div'>
                        <strong style={{ color: "white" }}>{player.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='h3' style={{ color: "white" }}>
                    Overall Rating: {player.overall_rating}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Players;
