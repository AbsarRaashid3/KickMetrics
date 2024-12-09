import React, { useState } from "react";
import players from "../players";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const CoachDashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [notes, setNotes] = useState({});
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

  const handleAddNote = (playerId) => {
    if (!noteText.trim()) return;
    setNotes({
      ...notes,
      [playerId]: [...(notes[playerId] || []), noteText],
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

  const lineChartData = selectedPlayer
    ? [
        { year: "2018", value: selectedPlayer.finishing - 10 },
        { year: "2019", value: selectedPlayer.finishing },
        { year: "2020", value: selectedPlayer.finishing + 5 },
        { year: "2021", value: selectedPlayer.finishing + 7 },
        { year: "2022", value: selectedPlayer.finishing + 10 },
      ]
    : [];

  return (
    <div className="container mt-5 coach-dashboard">
      <h1>Welcome to the Coach Dashboard</h1>
      <p>
        Analyze player performance, manage your favorites, and add notes for
        better tactical planning.
      </p>

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

      {/* Player Details with Radar Chart */}
      {selectedPlayer && (
        <div className="player-analysis">
          <h2>{selectedPlayer.name}</h2>
          <p>Analyze key attributes and performance trends.</p>

          {/* Radar Chart */}
          <div className="chart-container">
            <h4>Key Attributes (Radar Chart)</h4>
            <RadarChart
              width={300}
              height={300}
              data={radarData}
              className="radar-chart"
            >
              <PolarGrid stroke="#000"/>
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
          </div>

          {/* Line Chart */}
          <div className="chart-container">
            <h4>Performance Over Time (Line Chart)</h4>
            <LineChart
              width={500}
              height={300}
              data={lineChartData}
              className="line-chart"
            >
              <CartesianGrid stroke="#333333" strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#000000" />
            </LineChart>
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

      {/* Notes Section */}
      <h3>Player Notes</h3>
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
            onClick={() => handleAddNote(selectedPlayer._id)}
          >
            Add Note
          </button>
          <div className="notes-list mt-3">
            {notes[selectedPlayer._id]?.map((note, index) => (
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

export default CoachDashboard;
