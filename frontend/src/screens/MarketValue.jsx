import React, { useState } from "react";
import PlayerCard from "../components/playerCard";
import { useNavigate } from 'react-router-dom';




const playersData = [
  {
    rank: 1,
    name: "L. Messi",
    image: "/images/MessiV.JPG",
    marketValues: [
      { value: "£50m", clubLogo: "/images/barca.png", height: 30 },
      { value: "£100m", clubLogo: "/images/barca.png", height: 60 },
      { value: "£120m", clubLogo: "/images/psg.png", height: 90 },
      { value: "£90m", clubLogo: "/images/psg.png", height: 80 },
    ],
  },
  {
    rank: 2,
    name: "C. Eriksen",
    image: "/images/IMG_0601.jpg",
    marketValues: [
      { value: "£20m", clubLogo: "/images/ajax.png", height: 25 },
      { value: "£45m", clubLogo: "/images/spurs.png", height: 60 },
      { value: "£80m", clubLogo: "/images/inter.png", height: 85 },
    ],
  },
  {
    rank: 3,
    name: "P. Pogba",
    image: "/images/PogbaV.jpg",
    marketValues: [
      { value: "£30m", clubLogo: "/images/juventus.png", height: 40 },
      { value: "£85m", clubLogo: "/images/manutd.png", height: 80 },
      { value: "£60m", clubLogo: "/images/juventus.png", height: 70 },
    ],
  },
  {
    rank: 4,
    name: "L. Insigne",
    image: "/images/L.jpg",
    marketValues: [
      { value: "£25m", clubLogo: "/images/napoli.png", height: 35 },
      { value: "£50m", clubLogo: "/images/napoli.png", height: 60 },
      { value: "£40m", clubLogo: "/images/toronto.png", height: 50 },
    ],
  },
  {
    rank: 5,
    name: "K. Koulibaly",
    image: "/images/K.JPG",
    marketValues: [
      { value: "£25m", clubLogo: "/images/napoli.png", height: 40 },
      { value: "£50m", clubLogo: "/images/napoli.png", height: 70 },
      { value: "£40m", clubLogo: "/images/chelsea.png", height: 60 },
    ],
  },
  {
    rank: 6,
    name: "V. van Dijk",
    image: "/images/V.jpg",
    marketValues: [
      { value: "£20m", clubLogo: "/images/celtic.png", height: 35 },
      { value: "£75m", clubLogo: "/images/liverpool.png", height: 90 },
      { value: "£60m", clubLogo: "/images/liverpool.png", height: 80 },
    ],
  },
  {
    rank: 7,
    name: "K. Mbappé",
    image: "/images/Mbv.JPG",
    marketValues: [
      { value: "£50m", clubLogo: "/images/monaco.png", height: 40 },
      { value: "£150m", clubLogo: "/images/psg.png", height: 90 },
      { value: "£160m", clubLogo: "/images/psg.png", height: 95 },
    ],
  },
  {
    rank: 8,
    name: "M. Neuer",
    image: "/images/Nu.jpg",
    marketValues: [
      { value: "£15m", clubLogo: "/images/schalke.png", height: 25 },
      { value: "£45m", clubLogo: "/images/bayern.png", height: 70 },
      { value: "£35m", clubLogo: "/images/bayern.png", height: 60 },
    ],
  },
];

  

  const MarketValue = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    const filteredPlayers = playersData.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleCardClick = (playerId) => {
      navigate(`/prediction/${playerId}`);
    };
  
    return (
      <div className="market-value">
        <h1>Player Market Value Progress</h1>
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
              key={player.rank} // Assuming rank is unique for each player
              player={player}
              onClick={() => handleCardClick(player.rank)} // Pass the player rank or unique identifier
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default MarketValue;