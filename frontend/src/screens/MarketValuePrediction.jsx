import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import axios from "axios";
import { useGetPlayersQuery } from "../redux/slices/playersApiSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Feature importance data
const featureImportanceData = [
  { feature: "age", value: 4.85 },
  { feature: "overall_rating", value: 87.12 },
  { feature: "potential", value: 6.78 },
  { feature: "long_shots", value: 0.07 },
  { feature: "crossing", value: 0.03 },
  { feature: "finishing", value: 0.48 },
  { feature: "heading_accuracy", value: 0.03 },
  { feature: "short_passing", value: 0.05 },
  { feature: "dribbling", value: 0.08 },
  { feature: "ball_control", value: 0.07 },
  { feature: "acceleration", value: 0.02 },
  { feature: "sprint_speed", value: 0.03 },
  { feature: "stamina", value: 0.04 },
  { feature: "strength", value: 0.02 },
  { feature: "vision", value: 0.05 },
  { feature: "positioning", value: 0.15 },
  { feature: "penalties", value: 0.08 },
  { feature: "composure", value: 0.03 },
];

const FeatureImportanceChart = () => {
  return (
    <div
      style={{
        marginTop: "2rem",
        background: "rgba(0, 0, 0, 0.7)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#00ffff",
          marginBottom: "1rem",
        }}
      >
        Feature Importance Impacting Market Value
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={featureImportanceData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,255,255,0.3)"
          />
          <XAxis
            dataKey="feature"
            tick={{ fill: "#00ffff" }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis tick={{ fill: "#00ffff" }} />
          <Tooltip
            contentStyle={{
              background: "rgba(0, 0, 0, 0.8)",
              border: "none",
              color: "#00ffff",
            }}
          />
          <Bar dataKey="value" fill="url(#gradient)">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 255, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(0, 128, 128, 0.8)" />
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const MarketValuePrediction = () => {
  const { playerId } = useParams();
  console.log("Player ID type:", typeof playerId);

  const { data: players = [], isLoading, error } = useGetPlayersQuery();
  const player = players?.find((p) => String(p._id) === playerId);
  console.log("Found player:", player);

  const [predictedValue, setPredictedValue] = useState(null);
  const predictedValueRef = useRef();
  const [loading, setLoading] = useState(true);
  const [predictionError, setPredictionError] = useState(null);
  const [image, setImage] = useState(player?.image || "/images/default.jpg");
  const [visible,setVisible] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (player && !player.image) {
        const storedImage = localStorage.getItem(`image_${player._id}`);
        if (storedImage) {
          setImage(storedImage);
        } else {
          try {
            const { data } = await axios.get(`/api/players/${player._id}`);
            if (data.image_url) {
              setImage(data.image_url);
              localStorage.setItem(`image_${player._id}`, data.image_url);
            }
          } catch (error) {
            console.error(`Error fetching image for ${player.name}:`, error);
          }
        }
      }
    };

    fetchImage();
  }, [player]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 30000); // Toggle every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!player) return;

    const fetchPrediction = async () => {
      try {
        setLoading(true);
        setPredictionError(null);

        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId: String(player._id) }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Prediction received:", data);
        setPredictedValue(data.predicted_value);
      } catch (err) {
        console.error("Error fetching predicted market value:", err);
        setPredictionError("Failed to fetch market value.");
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

  if (isLoading) {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h3>Loading player data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h3>Error loading player: {error.message}</h3>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="error-message">
        <h2>Player Not Found</h2>
        <p>Sorry, we couldn't find the player you're looking for.</p>
      </div>
    );
  }

  return (
    <div
      className="prediction-page"
      style={{
        background:
          "linear-gradient(135deg, rgb(8, 25, 69), rgb(35, 29, 29), #670d0d)",
      }}
    >
      <h1 className="page-title" style={{ color: "white" }}>
        Market Value Prediction
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* Player Card (Left Side) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "350px",
            perspective: "800px",
          }}
        >
          <div
            style={{
              width: "300px",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(0, 255, 255, 0.7)",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: "rotateY(10deg)",
              animation: "float 3s ease-in-out infinite alternate",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "3px",
                background: "rgba(0, 255, 255, 0.8)",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
                animation: "scanline 2s infinite alternate",
              }}
            ></div>

            <img
              src={image}
              alt={player.name}
              onError={() => setImage("/images/default.jpg")}
              style={{
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)",
                marginBottom: "15px",
              }}
            />

            <h2
              style={{
                color: "#00ffff",
                fontSize: "1.5rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "2px",
                textShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
                animation: "glitchText 1.5s infinite alternate",
              }}
            >
              {player.name}
            </h2>

            <p style={{ color: "#ccc", fontSize: "1rem", marginBottom: "5px" }}>
              <strong>Age:</strong> {player.age}
            </p>
            <p style={{ color: "#ccc", fontSize: "1rem" }}>
              <strong>Nationality:</strong> {player.nationality}
            </p>
          </div>
        </div>

        {/* Market Value Prediction (Right Side) */}
        <div
          style={{
            width: "300px",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(0, 255, 255, 0.7)",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
            position: "relative",
            animation: "flicker 2s infinite alternate",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#00ffff",
              letterSpacing: "2px",
            }}
          >
            Market Value Prediction
          </h3>
          <h2
            style={{
              fontSize: "1.2rem",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "red",
              letterSpacing: "2px",
            }}
          >
            {player.name}
          </h2>
          {loading ? (
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#ffd700",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.8)",
                animation: "glitchText 1.5s infinite alternate",
              }}
            >
              Loading...
            </p>
          ) : predictionError ? (
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "red",
                textShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
              }}
            >
              {predictionError}
            </p>
          ) : (
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#ffd700",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.8)",
                animation: "glitchText 1.5s infinite alternate",
              }}
            >
              €
              <span ref={predictedValueRef}>
                {predictedValue ? predictedValue.toFixed(2) : "N/A"}
              </span>
            </p>
          )}
        </div>
      </div>
<div className="mb-5">
      {/* Feature Importance Chart */}
      <FeatureImportanceChart />
      </div>
     

      <div
        className="section2 mb-5"
        style={{
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #670d0d, rgb(75, 79, 90), #223a6a)",
        }}
      >
        <div className="container py-4">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="position-relative">
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-gradient rounded-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(107, 1, 1, 0.7), rgba(255, 99, 71, 0.7))",
                }}
              ></div>
              <img
                alt="strenght"
                className="position-relative z-2 rounded-3"
                height="700"
                src="/images/mvp5.jpeg"
                width="550"
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
  <div className="mb-4">
    <h2 className="text-white fw-bold fs-5">
      MARKET VALUE PREDICTION MODEL
    </h2>
    <h1 className="text-4xl fw-bold text-info">
      Machine Learning Model: Random Forest Regressor
    </h1>
    <ul className="list-unstyled mt-4">
      <li>Predict and analyze player market value with high accuracy</li>
      <li>Identify key attributes influencing a player's valuation</li>
      <li>Compare model performance across different techniques</li>
    </ul>
    <p className="mt-4">
      Our <strong>market value prediction model</strong> is powered by a 
      <strong> Random Forest Regressor</strong>, which outperforms traditional methods like 
      <strong> Linear Regression</strong> and <strong>XGBoost</strong> when dealing with complex, 
      non-linear football data.
    </p>
    <p className="mt-2">
      <strong>Feature Importance Analysis</strong> helps us determine the most critical 
      attributes affecting a player's market value, such as 
      <strong> age, position, match performance, contract details, and physical stats</strong>.
    </p>
    <h3 className="text-info fw-bold mt-3">Why Random Forest?</h3>
    <p className="mt-2">
      - <strong>Linear Regression</strong> struggles with non-linear patterns in football data. <br />
      - <strong>XGBoost</strong> performs well but can overfit when dealing with high-variance player data. <br />
      - <strong>Random Forest</strong> balances <strong>accuracy and interpretability</strong>, 
      handling outliers and missing values effectively while providing a clear view of feature importance.
    </p>
    <p className="mt-2">
      Our system ensures <strong>scouts and analysts</strong> get precise player valuation insights, 
      helping clubs make <strong>data-driven transfer decisions</strong>.
    </p>
  </div>
</div>

          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
  {/* Left Column - Text Content */}
  <div className="d-flex flex-column justify-content-center">
    <div className="mb-4">
      <h1 className="text-4xl fw-bold text-info">
        Top 3 Factors Affecting Market Value:
      </h1>
      <ul className="list-unstyled mt-4">
        <li>
          <strong>Overall Rating:</strong> A player's general skill level and performance.
        </li>
        <li>
          <strong>Potential:</strong> The predicted growth and future ability of the player.
        </li>
        <li>
          <strong>Age:</strong> Younger players with high potential often have higher market value.
        </li>
      </ul>
      <p className="mt-4">
        These key attributes significantly impact a player's transfer value. 
        Clubs, scouts, and analysts use advanced AI models to assess them accurately.
      </p>
    </div>
  </div>

  {/* Right Column - Image */}
  <div className="position-relative">
    <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient rounded-3 transform-rotate"></div>
    <img
      alt="Football analysis image"
      className="position-relative z-2 rounded-3"
      height="650"
      src="/images/mvp4.jpeg"
      width="450"
    />
  </div>
</div>

        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div
        className="small-container mb-5 "
        style={{ maxWidth: "40%", margin: "0 auto", padding: "10px" }}
      >
        <div className="small-overlay"></div>
        <div
  className="small-content"
  style={{
    background: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(0, 255, 255, 0.7)",
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
    position: "relative",
    animation: "flicker 2s infinite alternate",
    maxWidth: "600px",
    margin: "auto",
  }}
>
  <h1
    className="small-heading"
    style={{
      color: "#00ffff",
      fontSize: "2rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: "2px",
      textShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
      animation: "glitchText 1.5s infinite alternate",
    }}
  >
    DATA-DRIVEN MARKET VALUE PREDICTION
  </h1>
  <p
    className="small-description"
    style={{
      color: "#ccc",
      fontSize: "1rem",
      lineHeight: "1.5",
      textShadow: "0 0 8px rgba(0, 255, 255, 0.5)",
    }}
  >
    KickMetrics leverages advanced AI models trained on real-world football data to predict player market value accurately. 
    Our system considers key performance metrics, potential growth, and historical trends to deliver reliable insights.
  </p>

  {/* Glowing Scanline Effect */}
  <div
    style={{
      position: "absolute",
      top: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80%",
      height: "3px",
      background: "rgba(0, 255, 255, 0.8)",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
      animation: "scanline 2s infinite alternate",
    }}
  ></div>
</div>


      </div>
    </div>
  );
};

export default MarketValuePrediction;
