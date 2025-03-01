// import React, { useState } from "react";
// import PlayerCard from "../components/playerCard";
// import { useNavigate } from 'react-router-dom';
// import players from "../players"; // Ensure this imports from your players.js

// const MarketValue = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const filteredPlayers = players.filter((player) =>
//     player.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCardClick = (playerId) => {
//     navigate(`/prediction/${playerId}`);
//   };

//   return (
//     <div className="market-value">
//       <h1 style={{ color: "white" }}>Player Market Value Progress</h1>
//       <input
//         type="text"
//         placeholder="Search for a player..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-box"
//       />
//       <div className="player-grid">
//         {filteredPlayers.map((player) => (
//           <PlayerCard
//             key={player._id}
//             player={player}
//             onClick={() => handleCardClick(player._id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MarketValue;
