import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ResponsiveBar } from '@nivo/bar'; // Nivo Bar
import { BarChart, Bar as ReBar, XAxis, YAxis, Tooltip as ReTooltip, CartesianGrid } from 'recharts'; // Recharts
import { VictoryBar, VictoryChart } from 'victory'; // Victory
import players from '../players'; // Import the players data

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ComparePlayersScreen = () => {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const handleSelectPlayer = (player, slot) => {
    if (slot === 1) {
      setPlayer1(player);
    } else {
      setPlayer2(player);
    }
  };

  const prepareData = () => {
    if (!player1 || !player2) return null;

    const attributes = [
      { key: 'dribbling', label: 'Dribbling' },
      { key: 'finishing', label: 'Finishing' },
      { key: 'sprint_speed', label: 'Speed' },
      { key: 'short_passing', label: 'Passing' },
      { key: 'interceptions', label: 'Defending' },
      { key: 'strength', label: 'Physical' },
    ];

    return attributes.map(attr => ({
      name: attr.label,
      player1: player1[attr.key],
      player2: player2[attr.key],
    }));
  };

  const radarChartData = () => {
    if (!player1 || !player2) return null;

    return {
      labels: ['Dribbling', 'Finishing', 'Speed', 'Passing', 'Defending', 'Physical'],
      datasets: [
        {
          label: player1.name,
          data: [
            player1.dribbling,
            player1.finishing,
            player1.sprint_speed,
            player1.short_passing,
            player1.interceptions,
            player1.strength,
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
        {
          label: player2.name,
          data: [
            player2.dribbling,
            player2.finishing,
            player2.sprint_speed,
            player2.short_passing,
            player2.interceptions,
            player2.strength,
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    };
  };

  const barData = prepareData();

  return (
    <div>
      <h2 className="mb-4">Compare Players</h2>

      {/* Select Players */}
      <Row className="mb-3">
        <Col md={6}>
          <h4>Select Player 1</h4>
          <select
            className="form-select"
            onChange={(e) =>
              handleSelectPlayer(players.find(player => player._id === e.target.value), 1)
            }
          >
            <option>Select Player</option>
            {players.map(player => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </Col>
        <Col md={6}>
          <h4>Select Player 2</h4>
          <select
            className="form-select"
            onChange={(e) =>
              handleSelectPlayer(players.find(player => player._id === e.target.value), 2)
            }
          >
            <option>Select Player</option>
            {players.map(player => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      {/* Player Cards */}
      <Row>
        <Col md={6}>{player1 && <Card>
          <Card.Img variant="top" src={player1.image} />
          <Card.Body>
            <Card.Title>{player1.name}</Card.Title>
          </Card.Body>
        </Card>}</Col>
        <Col md={6}>{player2 && <Card>
          <Card.Img variant="top" src={player2.image} />
          <Card.Body>
            <Card.Title>{player2.name}</Card.Title>
          </Card.Body>
        </Card>}</Col>
      </Row>

      {/* Chart.js: Radar Chart */}
      <Row className="mt-5">
        <Col>
          <h4>Radar Chart (Chart.js)</h4>
          {radarChartData() && (
            <Radar
              data={radarChartData()}
              options={{
                responsive: true,
                scales: {
                  r: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </Col>
      </Row>

      {/* Recharts: Bar Chart */}
      <Row>
        <Col>
          <h4>Recharts Bar Chart</h4>
          {barData && (
            <BarChart
              width={500}
              height={300}
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <ReBar dataKey="player1" fill="#8884d8" />
              <ReBar dataKey="player2" fill="#82ca9d" />
            </BarChart>
          )}
        </Col>
      </Row>

      {/* Victory: Bar Chart */}
      <Row>
        <Col>
          <h4>Victory Bar Chart</h4>
          {barData && (
            <VictoryChart>
              <VictoryBar
                data={barData}
                x="name"
                y="player1"
                style={{ data: { fill: "#4caf50" } }}
              />
              <VictoryBar
                data={barData}
                x="name"
                y="player2"
                style={{ data: { fill: "#f44336" } }}
              />
            </VictoryChart>
          )}
        </Col>
      </Row>

      {/* Nivo: Responsive Bar */}
      <Row>
        <Col style={{ height: "400px" }}>
          <h4>Nivo Bar Chart</h4>
          {barData && (
            <ResponsiveBar
              data={barData}
              keys={["player1", "player2"]}
              indexBy="name"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Attribute",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Score",
                legendPosition: "middle",
                legendOffset: -40,
              }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ComparePlayersScreen;
