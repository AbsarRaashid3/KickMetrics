// import React, { useState } from "react";
// import players from "../players";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// const CoachDashboard = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [selectedPlayer, setSelectedPlayer] = useState(null);
//   const [notes, setNotes] = useState({});
//   const [noteText, setNoteText] = useState("");

//   const addFavoritePlayer = (player) => {
//     if (!favorites.find((fav) => fav._id === player._id)) {
//       setFavorites([...favorites, player]);
//     }
//   };

//   const removeFavoritePlayer = (playerId) => {
//     setFavorites(favorites.filter((fav) => fav._id !== playerId));
//   };

//   const handlePlayerSelect = (e) => {
//     const player = players.find((p) => p._id === e.target.value);
//     setSelectedPlayer(player);
//   };

//   const handleAddNote = (playerId) => {
//     if (!noteText.trim()) return;
//     setNotes({
//       ...notes,
//       [playerId]: [...(notes[playerId] || []), noteText],
//     });
//     setNoteText("");
//   };

//   const radarData = selectedPlayer
//     ? [
//         { attribute: "Dribbling", value: selectedPlayer.dribbling },
//         { attribute: "Finishing", value: selectedPlayer.finishing },
//         { attribute: "Speed", value: selectedPlayer.sprint_speed },
//         { attribute: "Passing", value: selectedPlayer.short_passing },
//         { attribute: "Stamina", value: selectedPlayer.stamina },
//         { attribute: "Strength", value: selectedPlayer.strength },
//       ]
//     : [];

//   const lineChartData = selectedPlayer
//     ? [
//         { year: "2018", value: selectedPlayer.finishing - 10 },
//         { year: "2019", value: selectedPlayer.finishing },
//         { year: "2020", value: selectedPlayer.finishing + 5 },
//         { year: "2021", value: selectedPlayer.finishing + 7 },
//         { year: "2022", value: selectedPlayer.finishing + 10 },
//       ]
//     : [];

//   return (
//     <div className="container mt-5 coach-dashboard">
//       <h1>Welcome to the Coach Dashboard</h1>
//       <p>
//         Analyze player performance, manage your favorites, and add notes for
//         better tactical planning.
//       </p>

//       {/* Player Selection Dropdown */}
//       <h3>Select a Player</h3>
//       <select className="form-select mb-3" onChange={handlePlayerSelect}>
//         <option value="">Select a Player</option>
//         {players.map((player) => (
//           <option key={player._id} value={player._id}>
//             {player.name}
//           </option>
//         ))}
//       </select>

//       {/* Player Details with Radar Chart */}
//       {selectedPlayer && (
//         <div className="player-analysis">
//           <h2>{selectedPlayer.name}</h2>
//           <p>Analyze key attributes and performance trends.</p>

//           {/* Radar Chart */}
//           <div className="chart-container">
//             <h4>Key Attributes (Radar Chart)</h4>
//             <RadarChart
//               width={300}
//               height={300}
//               data={radarData}
//               className="radar-chart"
//             >
//               <PolarGrid stroke="#000"/>
//               <PolarAngleAxis dataKey="attribute" />
//               <PolarRadiusAxis angle={30} domain={[0, 100]} />
//               <Radar
//                 name={selectedPlayer.name}
//                 dataKey="value"
//                 stroke="#8884d8"
//                 fill="#8884d8"
//                 fillOpacity={0.6}
//               />
//             </RadarChart>
//           </div>

//           {/* Line Chart */}
//           <div className="chart-container">
//             <h4>Performance Over Time (Line Chart)</h4>
//             <LineChart
//               width={500}
//               height={300}
//               data={lineChartData}
//               className="line-chart"
//             >
//               <CartesianGrid stroke="#333333" strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="value" stroke="#000000" />
//             </LineChart>
//           </div>
//         </div>
//       )}

//       {/* Favorite Players Section */}
//       <h3>Your Favorite Players</h3>
//       <div className="favorites-container">
//         {favorites.map((player) => (
//           <div className="favorite-card" key={player._id}>
//             <img src={player.image} alt={player.name} className="favorite-image" />
//             <div className="favorite-details">
//               <h4>{player.name}</h4>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => removeFavoritePlayer(player._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Favorite Player */}
//       <h3>Add to Favorite Players</h3>
//       <select
//         className="form-select add-favorite-dropdown"
//         onChange={(e) => {
//           const player = players.find((p) => p._id === e.target.value);
//           addFavoritePlayer(player);
//         }}
//       >
//         <option value="">Select a Player</option>
//         {players.map((player) => (
//           <option key={player._id} value={player._id}>
//             {player.name}
//           </option>
//         ))}
//       </select>

//       {/* Notes Section */}
//       <h3>Player Notes</h3>
//       {selectedPlayer && (
//         <div className="notes-section">
//           <textarea
//             className="form-control mb-2"
//             placeholder="Add a note..."
//             value={noteText}
//             onChange={(e) => setNoteText(e.target.value)}
//           ></textarea>
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={() => handleAddNote(selectedPlayer._id)}
//           >
//             Add Note
//           </button>
//           <div className="notes-list mt-3">
//             {notes[selectedPlayer._id]?.map((note, index) => (
//               <div key={index} className="note-item">
//                 <p>{note}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoachDashboard;

import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import players from "../players"; // Assuming players.js contains player stats

const CoachDashboard = () => {
  // Editable Standings State
  const [standings, setStandings] = useState([
    { team: "Team A", points: 45 },
    { team: "Team B", points: 40 },
    { team: "Team C", points: 38 },
  ]);

  const updateStandings = (index, key, value) => {
    const newStandings = [...standings];
    newStandings[index][key] = value;
    setStandings(newStandings);
  };

  // Player Selection & Stats
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const lastGameStats = { goals: 2, assists: 1, rating: 8.5 };

  // Progress Graph Data
  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Team Progress",
        data: [10, 20, 30, 40],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Sticky Notes
  const [notes, setNotes] = useState(["Improve defense", "Focus on stamina"]);
  const addNote = () => setNotes([...notes, ""]);
  const updateNote = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };
  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Next Game Section
  const [games, setGames] = useState([
    { opponent: "Team X", date: "2025-02-10" },
  ]);
  const addGame = () => setGames([...games, { opponent: "", date: "" }]);
  const updateGame = (index, key, value) => {
    const newGames = [...games];
    newGames[index][key] = value;
    setGames(newGames);
  };
  const deleteGame = (index) => setGames(games.filter((_, i) => i !== index));

  const [myTeam, setMyTeam] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");

  // Function to add selected player to myTeam
  const addPlayer = () => {
    if (!selectedPlayerId) return; // Ensure a player is selected

    const playerToAdd = players.find((p) => p._id === selectedPlayerId);
    if (playerToAdd && !myTeam.some((p) => p._id === selectedPlayerId)) {
      setMyTeam([...myTeam, playerToAdd]);
    }

    setSelectedPlayerId(""); // Reset dropdown after adding
  };

  // Function to remove a player from myTeam
  const deletePlayer = (index) => {
    setMyTeam(myTeam.filter((_, i) => i !== index));
  };

  return (
    
    <Container className="dashboardC" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <Row className="justify-content-center">
        
        <Col md={10} className="standings">
          <h4>Standings</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      value={team.team}
                      onChange={(e) => updateStandings(index, "team", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={team.points}
                      onChange={(e) => updateStandings(index, "points", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} className="player-section">
          <h4>Player Tracker</h4>
          <Form.Select onChange={(e) => setSelectedPlayer(players[e.target.value])}>
            {players.map((p, index) => (
              <option key={index} value={index}>{p.name}</option>
            ))}
          </Form.Select>
          
          <p><strong>Full Name:</strong> {selectedPlayer.full_name}</p>
          <p><strong>Age:</strong> {selectedPlayer.age}</p>
          <p><strong>Height:</strong> {selectedPlayer.height_cm} cm</p>
          <p><strong>Weight:</strong> {selectedPlayer.weight_kgs} kg</p>
          <p><strong>Nationality:</strong> {selectedPlayer.nationality}</p>
          <p><strong>Best Position:</strong> {selectedPlayer.best_position}</p>
          <p><strong>Overall Rating:</strong> {selectedPlayer.overall_rating}</p>
          <p><strong>Potential:</strong> {selectedPlayer.potential}</p>
          <p><strong>Dribbling:</strong> {selectedPlayer.dribbling}</p>
          <p><strong>Finishing:</strong> {selectedPlayer.finishing}</p>
          <p><strong>Acceleration:</strong> {selectedPlayer.acceleration}</p>
          <p><strong>Vision:</strong> {selectedPlayer.vision}</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} className="sticky-notes">
          <h4>Sticky Notes</h4>
          {notes.map((note, index) => (
            <div key={index} className="note">
              <Form.Control className=" mb-2 mt-2" value={note} onChange={(e) => updateNote(index, e.target.value)} />
              <Button className=" btn-danger mb-2 mt-2"  onClick={() => deleteNote(index)}>X</Button>
            </div>
          ))}
          <Button onClick={addNote}>Add Note</Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} className="next-games">
          <h4>Next Game</h4>
          {games.map((game, index) => (
            <div key={index}>
              <Form.Control className=" mb-2 mt-2"  value={game.opponent} onChange={(e) => updateGame(index, "opponent", e.target.value)} />
              <Form.Control className=" mb-2 mt-2" type="date" value={game.date} onChange={(e) => updateGame(index, "date", e.target.value)} />
              <Button className="btn-danger mb-2 mt-2" onClick={() => deleteGame(index)}>X</Button>
            </div>
          ))}
          <Button onClick={addGame}>Add Game</Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} className="my-team">
          <h4>My Team (Max 11 Players)</h4>
          <Form.Select 
          className=" mb-2 mt-2" 
            value={selectedPlayerId} 
            onChange={(e) => setSelectedPlayerId(e.target.value)}
            disabled={myTeam.length >= 11}
          >
            <option value="">Select a Player</option>
            {players
              .filter((p) => !myTeam.some((teamPlayer) => teamPlayer._id === p._id))
              .map((p) => (
                <option key={p._id} value={p._id}>{p.name} - {p.best_position}</option>
              ))}
          </Form.Select>

          <Button 
            onClick={addPlayer} 
            disabled={!selectedPlayerId || myTeam.length >= 11}
          >
            Add Player
          </Button>

          {myTeam.map((player, index) => (
            <div key={index} className=" mb-2 mt-2"  style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <p><strong>Name:</strong> {player.name}</p>
              <p><strong>Position(s):</strong> {player.positions}</p>
              <p><strong>Age:</strong> {player.age}</p>
              <p><strong>Overall Rating:</strong> {player.overall_rating}</p>
              <Button className="btn-danger mb-2 mt-2" onClick={() => deletePlayer(index)}>Remove</Button>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CoachDashboard;
