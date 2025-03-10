import React from "react";
import { GiAmericanFootballPlayer } from "react-icons/gi"; // Football icon

const FootballAlertModal = ({ message, onClose }) => {
  return (
    <div className="alert-modal">
      <div className="alert-content">
        <GiAmericanFootballPlayer className="football-icon" />
        <h3>{message}</h3>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FootballAlertModal;
