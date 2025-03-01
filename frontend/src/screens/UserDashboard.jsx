import React, { useState } from "react";
import players from "../players";
import {
  ResponsiveContainer,
  BarChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

const UserDashboard = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [comparePlayer, setComparePlayer] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [scoutNotes, setScoutNotes] = useState({});
  const [noteText, setNoteText] = useState("");

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

  const handleComparePlayerSelect = (e) => {
    const player = players.find((p) => p._id === e.target.value);
    setComparePlayer(player);
  };

  const handleAddScoutNote = (playerId) => {
    if (!noteText.trim()) return;
    setScoutNotes({
      ...scoutNotes,
      [playerId]: [...(scoutNotes[playerId] || []), noteText],
    });
    setNoteText("");
  };

  const radarData = selectedPlayer
    ? [
        { attribute: "Dribbling", value: selectedPlayer.dribbling },
        { attribute: "Finishing", value: selectedPlayer.finishing },
        { attribute: "Speed", value: selectedPlayer.sprint_speed },
        { attribute: "Passing", value: selectedPlayer.short_passing },
        { attribute: "Stamina", value: selectedPlayer.stamina },
        { attribute: "Strength", value: selectedPlayer.strength },
      ]
    : [];

  const comparisonData = selectedPlayer && comparePlayer
    ? [
        {
          attribute: "Dribbling",
          [selectedPlayer.name]: selectedPlayer.dribbling,
          [comparePlayer.name]: comparePlayer.dribbling,
        },
        {
          attribute: "Finishing",
          [selectedPlayer.name]: selectedPlayer.finishing,
          [comparePlayer.name]: comparePlayer.finishing,
        },
        {
          attribute: "Speed",
          [selectedPlayer.name]: selectedPlayer.sprint_speed,
          [comparePlayer.name]: comparePlayer.sprint_speed,
        },
        {
          attribute: "Passing",
          [selectedPlayer.name]: selectedPlayer.short_passing,
          [comparePlayer.name]: comparePlayer.short_passing,
        },
        {
          attribute: "Strength",
          [selectedPlayer.name]: selectedPlayer.strength,
          [comparePlayer.name]: comparePlayer.strength,
        },
      ]
    : [];

  return (
    <div className="container mt-5 scout-dashboard">
      <h1>Welcome to the Scout Dashboard</h1>
      <p>
        Compare players, manage favorites, and analyze detailed performance
        metrics to aid scouting decisions.
      </p>

      {/* Player Selection */}
      <h3>Select a Player for Analysis</h3>
      <select className="form-select mb-3" onChange={handlePlayerSelect}>
        <option value="">Select a Player</option>
        {players.map((player) => (
          <option key={player._id} value={player._id}>
            {player.name}
          </option>
        ))}
      </select>

      {/* Player Details and Radar Chart */}
      {selectedPlayer && (
        <div className="player-analysis">
          <h2>{selectedPlayer.name}</h2>
          <p>Key attribute analysis for scouting purposes.</p>

          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="attribute" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name={selectedPlayer.name}
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Player Comparison */}
      <h3>Compare with Another Player</h3>
      <select
        className="form-select mb-3"
        onChange={handleComparePlayerSelect}
      >
        <option value="">Select a Player to Compare</option>
        {players.map((player) => (
          <option key={player._id} value={player._id}>
            {player.name}
          </option>
        ))}
      </select>

      {selectedPlayer && comparePlayer && (
        <div className="comparison-chart">
          <h4>Player Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="attribute" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={selectedPlayer.name} fill="#8884d8" />
              <Bar dataKey={comparePlayer.name} fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Favorite Players Section */}
      <h3>Favorite Players</h3>
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

      {/* Add to Favorite Players */}
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

      {/* Scout Notes */}
      <h3>Scouting Notes</h3>
      {selectedPlayer && (
        <div className="notes-section">
          <textarea
            className="form-control mb-2"
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          ></textarea>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddScoutNote(selectedPlayer._id)}
          >
            Add Note
          </button>
          <div className="notes-list mt-3">
            {scoutNotes[selectedPlayer._id]?.map((note, index) => (
              <div key={index} className="note-item">
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
