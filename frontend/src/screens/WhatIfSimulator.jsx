import React, { useState, useEffect, useCallback } from "react";
import { Radar, Line, Bar } from "react-chartjs-2";
import { FaFootballBall } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, LineElement, PointElement, ArcElement, BarElement } from 'chart.js';
import { useGetPlayersQuery } from "../redux/slices/playersApiSlice";

ChartJS.register(
  CategoryScale, LinearScale, RadialLinearScale,
  LineElement, PointElement, ArcElement, BarElement
);

const allMetrics = [
  "finishing", "dribbling", "stamina", "crossing", "long_shots",
  "short_passing", "volleys", "ball_control", "acceleration", "sprint_speed",
  "strength", "heading_accuracy", "vision", "positioning"
];

const WhatIfSimulator = () => {
  const { data: players = [], isLoading, error } = useGetPlayersQuery();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState(allMetrics.slice(0, 5));
  const [metrics, setMetrics] = useState({});
  const [performance, setPerformance] = useState(0);

  const calculatePerformance = useCallback(() => {
    if (!metrics || Object.keys(metrics).length === 0) return 0;
    const weight = 100 / selectedMetrics.length;
    return (
      Object.values(metrics).reduce((total, value) => total + value * (weight / 100), 0)
    ).toFixed(1);
  }, [metrics, selectedMetrics]);

  useEffect(() => {
    if (players?.length > 0 && !selectedPlayer) {
      setSelectedPlayer(players[0]);
    }
  }, [players, selectedPlayer]);

  useEffect(() => {
    if (selectedPlayer) {
      const newMetrics = Object.fromEntries(
        selectedMetrics.map((metric) => [metric, selectedPlayer[metric] || 0])
      );
      setMetrics(newMetrics);
    }
  }, [selectedPlayer, selectedMetrics]);

  useEffect(() => {
    setPerformance(calculatePerformance());
  }, [calculatePerformance]);

  const handleSliderChange = (metric, value) => {
    setMetrics({ ...metrics, [metric]: value });
  };

  const handleMetricSelection = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : prev.length < 5
          ? [...prev, metric]
          : prev
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!selectedPlayer) return <div>Loading player data...</div>;

  const beforeMetrics = selectedMetrics.map((metric) => selectedPlayer[metric] || 0);
  const afterMetrics = selectedMetrics.map((metric) => metrics[metric] || 0);

  const radarData = {
    labels: selectedMetrics.map((metric) => metric.toUpperCase()),
    datasets: [
      {
        label: "Before",
        data: beforeMetrics,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "After",
        data: afterMetrics,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const lineChartData = {
    labels: selectedMetrics.map((metric) => metric.toUpperCase()),
    datasets: [
      {
        label: "Before Adjustment",
        data: beforeMetrics,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        tension: 0.2,
      },
      {
        label: "After Adjustment",
        data: afterMetrics,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  const overallPerformanceChangeData = {
    labels: selectedMetrics.map((metric) => metric.toUpperCase()),
    datasets: [
      {
        label: "Change in Performance",
        data: selectedMetrics.map((metric) => metrics[metric] - selectedPlayer[metric]),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const getPerformanceChangeText = (metric) => {
    const beforeValue = selectedPlayer[metric];
    const afterValue = metrics[metric];
    const change = afterValue - beforeValue;

    if (change > 0) {
      return (
        <p>
          <strong>{metric.charAt(0).toUpperCase() + metric.slice(1)}:</strong> Improved by{" "}
          {change} points, positively affecting overall performance.
        </p>
      );
    } else if (change < 0) {
      return (
        <p>
          <strong>{metric.charAt(0).toUpperCase() + metric.slice(1)}:</strong> Reduced by{" "}
          {Math.abs(change)} points, negatively affecting overall performance.
        </p>
      );
    } else {
      return (
        <p>
          <strong>{metric.charAt(0).toUpperCase() + metric.slice(1)}:</strong> No change.
        </p>
      );
    }
  };

  return (
    <div className="simulator-container">
      <h2>What-If Performance Simulator</h2>
      <div className="player-selector mb-5 text-center">
        <label>Select Player:</label>
        <select
          value={selectedPlayer._id}
          onChange={(e) =>
            setSelectedPlayer(
              players.find((player) => player._id === parseInt(e.target.value))
            )
          }
        >
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div className="metric-selector">
        <h3>Select Metrics to Adjust (5 Max):</h3>
        <div className="metric-buttons">
          {allMetrics.map((metric) => (
            <button
              key={metric}
              className={`metric-btn ${selectedMetrics.includes(metric) ? "selected" : ""}`}
              onClick={() => handleMetricSelection(metric)}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="sliders">
        {selectedMetrics.map((metric) => (
          <div key={metric} className="slider">
            <label>
              {metric.charAt(0).toUpperCase() + metric.slice(1)}: {metrics[metric]}
            </label>
            <input
              type="range"
              min="1"
              max="99"
              value={metrics[metric]}
              onChange={(e) => handleSliderChange(metric, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div className="performance-score">
        <h3>Performance Score: {performance}</h3>
      </div>

      <div className="chart-container">
        <Radar data={radarData} />
      </div>

      <div className="chart-container">
        <h4>Effect of Metric Changes</h4>
        <Line data={lineChartData} />
      </div>

      <div className="chart-container">
        <h4>Change in Overall Performance by Metric</h4>
        <Bar data={overallPerformanceChangeData} />
      </div>

      <div className="impact-dashboard">
        <h3>Impact Analysis</h3>
        {selectedMetrics.map((metric) => (
          <div key={metric} className="impact-item">
            <FaFootballBall />
            {getPerformanceChangeText(metric)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIfSimulator;
