import React, { useState } from "react";
import players from "../players";

const UserDashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const addFavoritePlayer = (player) => {
    if (!favorites.find((fav) => fav._id === player._id)) {
      setFavorites([...favorites, player]);
    }
  };

  const removeFavoritePlayer = (playerId) => {
    setFavorites(favorites.filter((fav) => fav._id !== playerId));
  };

  const handlePlayerSelect = (e) => {
    const player = players.find((p) => p._id === e.target.value);
    setSelectedPlayer(player);
  };

  return (
    <div className="container mt-5 user-dashboard">
      <h1>Welcome to the Football Enthusiasts Dashboard</h1>
      <p>Track your favorite players and analyze their stats with detailed insights.</p>

      {/* Player Selection Dropdown */}
      <h3>Select a Player</h3>
      <select className="form-select mb-3" onChange={handlePlayerSelect}>
        <option value="">Select a Player</option>
        {players.map((player) => (
          <option key={player._id} value={player._id}>
            {player.name}
          </option>
        ))}
      </select>

      {/* FIFA Card with Insights */}
      {selectedPlayer && (
        <div className="fifa-card">
          <img src={selectedPlayer.image} alt={selectedPlayer.name} className="player-image" />
          <h2 className="player-name">{selectedPlayer.name}</h2>
          <div className="player-stats">
            <p>Overall: {selectedPlayer.overall_rating}</p>
            <p>Shooting: {selectedPlayer.finishing}</p>
            <p>Passing: {selectedPlayer.short_passing}</p>
            <p>Dribbling: {selectedPlayer.dribbling}</p>
            <p>Stamina: {selectedPlayer.stamina}</p>
            <p>Strength: {selectedPlayer.strength}</p>
          </div>
          <div className="player-insights">
            <h4>Player Insights:</h4>
            <p>
              <strong>Age:</strong> {selectedPlayer.age}
            </p>
            <p>
              <strong>Position:</strong> {selectedPlayer.positions}
            </p>
            <p>
              <strong>Nationality:</strong> {selectedPlayer.nationality}
            </p>
            <p>
              <strong>Preferred Work Rate:</strong> {selectedPlayer.work_rate}
            </p>
          </div>
        </div>
      )}

      {/* Favorite Players Section */}
      <h3>Your Favorite Players</h3>
      <div className="favorites-container">
        {favorites.map((player) => (
          <div className="favorite-card" key={player._id}>
            <img src={player.image} alt={player.name} className="favorite-image" />
            <div className="favorite-details">
              <h4>{player.name}</h4>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFavoritePlayer(player._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Favorite Player */}
      <h3>Add to Favorite Players</h3>
      <select
        className="form-select add-favorite-dropdown"
        onChange={(e) => {
          const player = players.find((p) => p._id === e.target.value);
          addFavoritePlayer(player);
        }}
      >
        <option value="">Select a Player</option>
        {players.map((player) => (
          <option key={player._id} value={player._id}>
            {player.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserDashboard;
