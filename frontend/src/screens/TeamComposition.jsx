import React, { useState } from "react";
import players from "../players"; // Import the players.js file
import { GiAmericanFootballPlayer } from "react-icons/gi";
import FootballAlertModal from "../FootballAlertModal"; // Import the alert modal

const TeamComposition = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [customAttributes, setCustomAttributes] = useState({});
  const [isCustomTeam, setIsCustomTeam] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [playerSelectionList, setPlayerSelectionList] = useState([]);
  const [showPlayerSelectionModal, setShowPlayerSelectionModal] = useState(false);

  const positions = [
    { id: "GK", name: "Goalkeeper", top: "85%", left: "45%" },
    { id: "LB", name: "Left Back", top: "65%", left: "10%" },
    { id: "CB", name: "Center Back ", top: "65%", left: "35%" },
    { id: "CB", name: "Center Back ", top: "65%", left: "55%" },
    { id: "RB", name: "Right Back", top: "65%", left: "90%" },
    { id: "LM", name: "Left Midfielder", top: "40%", left: "10%" },
    { id: "CM", name: "Center Midfielder ", top: "40%", left: "35%" },
    { id: "CM", name: "Center Midfielder ", top: "40%", left: "55%" },
    { id: "RM", name: "Right Midfielder", top: "40%", left: "90%" },
    { id: "ST", name: "Striker ", top: "20%", left: "35%" },
    { id: "ST", name: "Striker ", top: "20%", left: "55%" },
  ];

  const handlePositionClick = (position) => {
    setSelectedPosition(position.id);
    const availablePlayers = players.filter((player) =>
      player.positions.includes(position.id)
    );
    setPlayerSelectionList(availablePlayers);
    setShowPlayerSelectionModal(true); // Show the modal
  };

  const handlePlayerSelectFromModal = (player) => {
    setSelectedPlayers({
      ...selectedPlayers,
      [selectedPosition]: player,
    });
    setShowPlayerSelectionModal(false); // Close the modal
    setSelectedPosition(null); // Reset position
  };

  const handleAttributeChange = (positionId, attribute, value) => {
    setCustomAttributes((prev) => ({
      ...prev,
      [positionId]: { ...prev[positionId], [attribute]: value },
    }));
  };

  const generateTeam = () => {
    const generatedTeam = {};

    positions.forEach((position) => {
      const positionId = position.id;
      const filters = customAttributes[positionId] || {};
      const matchingPlayers = players.filter(
        (player) =>
          player.positions.includes(positionId) &&
          (!filters.overall_rating || player.overall_rating >= filters.overall_rating) &&
          (!filters.speed || player.speed >= filters.speed) &&
          (!filters.strength || player.strength >= filters.strength)
      );

      generatedTeam[positionId] = matchingPlayers[0] || null;
    });

    setSelectedPlayers(generatedTeam);
    showFootballAlert("Team generated successfully!");
  };

  const validateCustomTeam = () => {
    const isValid = positions.every((position) => selectedPlayers[position.id]);
    showFootballAlert(
      isValid ? "Custom team is valid and complete!" : "Please fill all positions before continuing."
    );
  };

  const showFootballAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="team-composition">
      <h1 style={{color:"white"}}>Team Composition and Strategy</h1>

      {/* Mode Buttons */}
      <div className="mode-buttons ">
        <button className="mode-button football-button" onClick={() => setIsCustomTeam(true)}>
          Make Your Own Team
        </button>
        <button className="mode-button football-button" onClick={() => setIsCustomTeam(false)}>
          Generate Team
        </button>
      </div>

      {/* Validation Button */}
      {isCustomTeam && (
        <button className="validate-button football-button" onClick={validateCustomTeam}>
          Validate Team
        </button>
      )}

      {/* Custom Team Mode */}
      {isCustomTeam && (
        <div className="field">
          {positions.map((position) => (
            <div
              key={position.id}
              className={`position ${
                selectedPosition === position.id ? "active" : ""
              }`}
              style={{ top: position.top, left: position.left }}
              onClick={() => handlePositionClick(position)}
            >
              <GiAmericanFootballPlayer className="player-icon" />
              <span>{selectedPlayers[position.id]?.name || position.name}</span>
            </div>
          ))}
        </div>
      )}

{/* Generate Team Mode */}
{!isCustomTeam && (
  <div className="team-generation">
    <div className="field">
      {positions.map((position) => (
        <div
          key={position.id}
          className="position"
          style={{ top: position.top, left: position.left }}
        >
          <GiAmericanFootballPlayer className="player-icon" />
          <span>{position.name}</span>
        </div>
      ))}
    </div>

    <div className="attribute-panel">
      <h3 style={{color:"white"}}>Select Position & Attributes</h3>
      <select
        className="position-dropdown"
        onChange={(e) => setSelectedPosition(e.target.value)}
      >
        <option  value="">Select Position</option>
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.name}
          </option>
        ))}
      </select>

      {selectedPosition && (
        <div className="attribute-container">
          <h4 style={{color:"white"}}>{positions.find((pos) => pos.id === selectedPosition)?.name}</h4>
          <div className="attribute-selectors">
            <select
              onChange={(e) =>
                handleAttributeChange(selectedPosition, "overall_rating", e.target.value)
              }
            >
              <option value="">Minimum Rating</option>
              {[80, 85, 90, 95].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                handleAttributeChange(selectedPosition, "speed", e.target.value)
              }
            >
              <option value="">Minimum Speed</option>
              {[70, 80, 90, 100].map((speed) => (
                <option key={speed} value={speed}>
                  {speed}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                handleAttributeChange(selectedPosition, "strength", e.target.value)
              }
            >
              <option value="">Minimum Strength</option>
              {[70, 80, 90, 100].map((strength) => (
                <option key={strength} value={strength}>
                  {strength}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>

    <button className="mode-button football-button"onClick={generateTeam}>
      Generate Team
    </button>
  </div>
)}


      {/* Football Alert Modal */}
      {showAlert && (
        <FootballAlertModal message={alertMessage} onClose={closeAlert} />
      )}

      {/* Player Selection Modal */}
      {showPlayerSelectionModal && (
        <div className="alert-modal">
          <div className="alert-content">
            <h3>Select a Player</h3>
            <ul className="player-list">
              {playerSelectionList.map((player, index) => (
                <li
                  key={player.name}
                  onClick={() => handlePlayerSelectFromModal(player)}
                  className="player-item"
                >
                  {index + 1}. {player.name} (Rating: {player.overall_rating})
                </li>
              ))}
            </ul>
            <button
              className="close-button football-button"
              onClick={() => setShowPlayerSelectionModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamComposition;