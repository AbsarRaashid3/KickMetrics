import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerCard = ({ player, onClick }) => {
  const storedImage = localStorage.getItem(`image_${player.name}`);
  const [image, setImage] = useState(player.image || storedImage || "/images/default.jpg");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageFromDB = async () => {
      if (!player.image && !storedImage) { 
        setLoading(true);
        try {
          const { data } = await axios.get(`/api/players/${player._id}`); // ✅ Fetch from DB
          
          if (data.image_url) {
            setImage(data.image_url);
            localStorage.setItem(`image_${player.name}`, data.image_url); // Cache in localStorage
          }
        } catch (error) {
          console.error(`Error fetching image for ${player.name}:`, error);
        }
        setLoading(false);
      }
    };

    fetchImageFromDB();
  }, [player._id]);

  return (
    <div className="player-card" onClick={onClick}>
      <div className="card-background">
        <img 
          src={loading ? "/images/loading.gif" : image} 
          alt={player.name} 
          className="player-image"
          onError={() => setImage("/images/default.jpg")} // ✅ Fallback if broken image
        />
        <div className="overlay"></div>
        <div className="card-content">
          <div className="player-ranking">#{player._id}</div>
          <h2 className="player-name">{player.name}</h2>
        </div>
      </div>

      {/* ✅ Inline CSS inside JSX */}
      <style>{`
        .player-card {
          width: 250px;
          height: 350px;
          background:rgb(63, 5, 5);
          border-radius: 15px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }
        .player-card:hover {
          transform: scale(1.05);
        }
        .card-background {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .player-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
        }
        .card-content {
          position: absolute;
          bottom: 20px;
          left: 10px;
          color: white;
        }
        .player-ranking {
          font-size: 18px;
          font-weight: bold;
        }
        .player-name {
          font-size: 22px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PlayerCard;
