

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import players from "../players";
import { RadialChart } from "react-vis";
import { gsap } from "gsap";

const MarketValuePrediction = () => {
  const { playerId } = useParams();
  const player = players.find((p) => String(p._id) === String(playerId)); // Ensure IDs match correctly

  const [predictedValue, setPredictedValue] = useState(null);
  const predictedValueRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    if (!player) return;

    const fetchPrediction = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId: String(player._id) }), // Ensure ID is sent as a string
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Prediction received:", data);
        setPredictedValue(data.predicted_value);
      } catch (error) {
        console.error("Error fetching predicted market value:", error);
        setError("Failed to fetch market value.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [playerId, player]);

  useEffect(() => {
    if (predictedValue !== null && predictedValueRef.current) {
      gsap.to(predictedValueRef.current, {
        innerText: predictedValue.toFixed(2),
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          if (predictedValueRef.current) {
            setPredictedValue(Number(predictedValueRef.current.innerText));
          }
        },
      });
    }
  }, [predictedValue]);

  if (!player) {
    return (
      <div className="error-message">
        <h2>Player Not Found</h2>
        <p>Sorry, we couldn't find the player you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="prediction-page" style={{ background: "linear-gradient(135deg,rgb(8, 25, 69),rgb(35, 29, 29), #670d0d)" }}>
      <h1 className="page-title">Market Value Prediction</h1>

      <div className="player-container">
        <div className="player-info black-box">
          <img className="player-image" src={player.image} alt={player.name} />
          <div className="player-details">
            <h2>{player.name}</h2>
            <p><strong>Age:</strong> {player.age}</p>
            <p><strong>Nationality:</strong> {player.nationality}</p>
            <p><strong>Club:</strong> {player.club || "N/A"}</p>
            <p><strong>Market Value:</strong> €{player.value_euro || "N/A"}</p>
            <p><strong>Wage:</strong> €{player.wage_euro || "N/A"}</p>
          </div>
        </div>

        <div className="charts">
          <h3>Career Progression (Radial)</h3>
          {animateChart && (
            <RadialChart
              data={[
                { angle: 30, label: "2018" },
                { angle: 40, label: "2019" },
                { angle: 50, label: "2020" },
                { angle: 70, label: "2021" },
                { angle: 100, label: "2022" },
              ]}
              width={300}
              height={300}
              showLabels
              labelsStyle={{ fontSize: 12, fill: "#fff" }}
              animation
            />
          )}
        </div>
      </div>

      <div className="ml-prediction" style={{ background: "rgb(0, 0, 14)" }}>
        <h3>Market Value Predicted by ML Model</h3>
        {loading ? (
          <p className="predicted-value">Loading...</p>
        ) : error ? (
          <p className="predicted-value error">{error}</p>
        ) : (
          <p className="predicted-value">
            €<span ref={predictedValueRef}>{predictedValue ? predictedValue.toFixed(2) : "N/A"}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default MarketValuePrediction;

