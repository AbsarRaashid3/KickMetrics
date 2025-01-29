import React from "react";

const PlayerCard = ({ player, onClick }) => {
  // Calculate the points for the line and shaded area
  const svgPoints = player.marketValues.map((mv, index) => {
    const x = (index / (player.marketValues.length - 1)) * 100; // Spread evenly on x-axis
    const y = 100 - mv.height; // Map height to y-axis (invert for SVG coordinates)
    return `${x},${y}`;
  });

  // Add bottom points for the shaded area (x-axis) x axis
  const shadedPoints = [
    `0,100`, // Start at bottom-left
    ...svgPoints,
    `100,100`, // End at bottom-right
  ].join(" ");

  return (
    <div className="player-card" onClick={onClick}>
      <div
        className="card-background"
        style={{ backgroundImage: `url(${player.image})` }}
      >
        <div className="overlay1"></div>
        <div className="card-content">
          <div className="player-ranking">#{player.rank}</div>
          <h2 className="player-name">{player.name}</h2>
          <div className="market-value-progress">
            {/* Render market value points */}
            {player.marketValues.map((mv, index) => (
              <div
                key={index}
                className="market-point"
                style={{
                  left: `${(index / (player.marketValues.length - 1)) * 100}%`,
                  bottom: `${mv.height}%`,
                }}
              >
                <div className="market-value-label">{mv.value}</div>
                <div className="market-club-logo">
                  <img src={mv.clubLogo} alt="Club Logo" />
                </div>
              </div>
            ))}

            {/* SVG for the graph */}
            <svg
              className="progress-graph"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Shaded area under the line */}
              <polygon
                points={shadedPoints}
                style={{ fill: "rgba(128, 128, 128, 0.5)", stroke: "none" }}
              />
              {/* Line connecting data points */}
              <polyline
                points={svgPoints.join(" ")}
                style={{
                  fill: "none",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
