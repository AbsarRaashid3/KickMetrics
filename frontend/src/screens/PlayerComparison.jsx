import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Chart } from "react-google-charts";


const PlayerComparison = () => {
  const [players, setPlayers] = useState([
    {
      name: "Player A",
      goals: 20,
      assists: 10,
      tackles: 15,
    },
    {
      name: "Player B",
      goals: 15,
      assists: 8,
      tackles: 12,
    },
  ]);

  const handleAddPlayer = () => {
    const newPlayer = {
      name: `Player ${String.fromCharCode(65 + players.length)}`,
      goals: Math.floor(Math.random() * 30),
      assists: Math.floor(Math.random() * 20),
      tackles: Math.floor(Math.random() * 15),
    };
    setPlayers([...players, newPlayer]);
  };

  return (
    <div className="player-comparison-container">
      <h1>Player Comparison</h1>
      <button className="add-player-btn" onClick={handleAddPlayer}>
        Add Player
      </button>

      {/* Recharts Visualization */}
      <h2>Player Stats Comparison</h2>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart data={players}>
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip wrapperStyle={{ backgroundColor: "#222", color: "#fff" }} />
          <Legend />
          <Bar dataKey="goals" fill="#8884d8" />
          <Bar dataKey="assists" fill="#82ca9d" />
          <Bar dataKey="tackles" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>

      {/* React Google Charts Visualization */}
      <h2>Goals vs Assists Analysis</h2>
      <Chart
        chartType="ScatterChart"
        data={[
          ["Player", "Goals", "Assists"],
          ...players.map((player) => [player.name, player.goals, player.assists]),
        ]}
        options={{
          title: "Goals vs Assists",
          hAxis: { title: "Goals", minValue: 0, textStyle: { color: "#fff" } },
          vAxis: { title: "Assists", minValue: 0, textStyle: { color: "#fff" } },
          legend: "none",
          backgroundColor: "#1e3c72",
          titleTextStyle: { color: "#fff" },
        }}
        width="90%"
        height="400px"
      />
    </div>
  );
};

export default PlayerComparison;
