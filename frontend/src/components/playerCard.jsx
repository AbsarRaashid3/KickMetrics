
import React from "react";

const PlayerCard = ({ player, onClick }) => {
  return (
    <div className="player-card" onClick={onClick}>
      <div
        className="card-background"
        style={{ backgroundImage: `url(${player.image})` }}
      >
        <div className="overlay1"></div>
        <div className="card-content">
          {/* Displaying _id as the ranking identifier */}
          <div className="player-ranking">#{player._id}</div>
          <h2 className="player-name">{player.name}</h2>
          {/* Market values graph removed */}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
