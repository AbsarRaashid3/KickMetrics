import React, { useState } from "react";
import PlayerCard from "../components/playerCard";
import { useNavigate } from 'react-router-dom';
import { useGetPlayersQuery } from "../redux/slices/playersApiSlice";

const MarketValue = () => {
  const { data: players = [], isLoading, error } = useGetPlayersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // Loading state
  if (isLoading) {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h3>Loading players data...</h3>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h3>Error loading players: {error.message}</h3>
      </div>
    );
  }

  const filteredPlayers = players?.filter((player) =>
    player?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCardClick = (playerId) => {
    if (playerId) {
      navigate(`/prediction/${playerId}`);
    }  
  };

  return (
    <div className="market-value">
      <h1 style={{ color: "white" }}>Player Market Value Progress</h1>
      <input
        type="text"
        placeholder="Search for a player..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="player-grid">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player._id}
            player={player}
            onClick={() => handleCardClick(player._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketValue;
