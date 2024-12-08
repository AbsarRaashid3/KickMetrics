import React, { useState } from "react";
import PlayerCard from "../components/playerCard";
import { useNavigate } from 'react-router-dom';

const playersData = [
    {
      rank: 1,
      name: "L. Messi",
      image: "/images/MessiV.JPG",
      marketValues: [
        { value: "£50m", clubLogo: "/logos/barca.png", height: 30 },
        { value: "£100m", clubLogo: "/logos/barca.png", height: 60 },
        { value: "£120m", clubLogo: "/logos/psg.png", height: 90 },
        { value: "£90m", clubLogo: "/logos/psg.png", height: 80 },
      ],
    },
    {
      rank: 2,
      name: "C. Eriksen",
      image: "/images/IMG_0601.jpg",
      marketValues: [
        { value: "£20m", clubLogo: "/logos/ajax.png", height: 25 },
        { value: "£45m", clubLogo: "/logos/spurs.png", height: 60 },
        { value: "£80m", clubLogo: "/logos/inter.png", height: 85 },
      ],
    },
    {
      rank: 3,
      name: "P. Pogba",
      image: "/images/PogbaV.jpg",
      marketValues: [
        { value: "£30m", clubLogo: "/logos/juventus.png", height: 40 },
        { value: "£85m", clubLogo: "/logos/manutd.png", height: 80 },
        { value: "£60m", clubLogo: "/logos/juventus.png", height: 70 },
      ],
    },
    {
      rank: 4,
      name: "L. Insigne",
      image: "/images/L. Insigne.jpg",
      marketValues: [
        { value: "£25m", clubLogo: "/logos/napoli.png", height: 35 },
        { value: "£50m", clubLogo: "/logos/napoli.png", height: 60 },
        { value: "£40m", clubLogo: "/logos/toronto.png", height: 50 },
      ],
    },
    {
      rank: 5,
      name: "K. Koulibaly",
      image: "/images/K. Koulibaly.jpg",
      marketValues: [
        { value: "£25m", clubLogo: "/logos/napoli.png", height: 40 },
        { value: "£50m", clubLogo: "/logos/napoli.png", height: 70 },
        { value: "£40m", clubLogo: "/logos/chelsea.png", height: 60 },
      ],
    },
    {
      rank: 6,
      name: "V. van Dijk",
      image: "/images/V. van Dijk.jpg",
      marketValues: [
        { value: "£20m", clubLogo: "/logos/celtic.png", height: 35 },
        { value: "£75m", clubLogo: "/logos/liverpool.png", height: 90 },
        { value: "£60m", clubLogo: "/logos/liverpool.png", height: 80 },
      ],
    },
    {
      rank: 7,
      name: "K. Mbappé",
      image: "/images/K. Mbappé.jpg",
      marketValues: [
        { value: "£50m", clubLogo: "/logos/monaco.png", height: 40 },
        { value: "£150m", clubLogo: "/logos/psg.png", height: 90 },
        { value: "£160m", clubLogo: "/logos/psg.png", height: 95 },
      ],
    },
    {
      rank: 8,
      name: "M. Neuer",
      image: "/images/M. Neuer.jpg",
      marketValues: [
        { value: "£15m", clubLogo: "/logos/schalke.png", height: 25 },
        { value: "£45m", clubLogo: "/logos/bayern.png", height: 70 },
        { value: "£35m", clubLogo: "/logos/bayern.png", height: 60 },
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