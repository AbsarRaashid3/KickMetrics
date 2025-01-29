import React, { useState } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip } from "recharts";
import { ResponsiveBar } from "@nivo/bar";
import players from "../players";

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
      { key: "dribbling", label: "Dribbling" },
      { key: "finishing", label: "Finishing" },
      { key: "sprint_speed", label: "Speed" },
      { key: "short_passing", label: "Passing" },
      { key: "interceptions", label: "Defending" },
      { key: "strength", label: "Physical" },
    ];

    return attributes.map((attr) => ({
      name: attr.label,
      player1: player1[attr.key],
      player2: player2[attr.key],
    }));
  };

  const radarChartData = () => {
    if (!player1 || !player2) return null;

    return {
      labels: ["Dribbling", "Finishing", "Speed", "Passing", "Defending", "Physical"],
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
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
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
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const barData = prepareData();

  return (
    <div>
      <h2 className="mb-4 text-center">Compare Players</h2>

      {/* Select Players */}
      <Row className="mb-3">
        <Col md={6}>
          <h4>Select Player 1</h4>
          <select
            className="form-select"
            onChange={(e) =>
              handleSelectPlayer(players.find((player) => player._id === e.target.value), 1)
            }
          >
            <option>Select Player</option>
            {players.map((player) => (
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
              handleSelectPlayer(players.find((player) => player._id === e.target.value), 2)
            }
          >
            <option>Select Player</option>
            {players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      {/* Player Cards */}
      <Row>
        <Col md={6}>
          {player1 && (
            <Card
              className="mb-3"
              style={{
                border: "none",
                background:
                  "linear-gradient(135deg, #7FFFD4 0%, #4F7942 60%, #5cd65c 100%)",
                color: "white",
                borderRadius: "15px",
                padding: "15px",
                position: "relative",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "gold",
                  borderRadius: "50%",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {player1.overall_rating}
              </div>
              <Card.Img
                variant="top"
                src={player1.image}
                style={{
                  objectFit: "contain",
                  height: "250px",
                  margin: "10px auto",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Card.Body>
                <Card.Title>{player1.name}</Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={6}>
          {player2 && (
            <Card
              className="mb-3"
              style={{
                border: "none",
                background:
                  "linear-gradient(135deg, #7FFFD4 0%, #4F7942 60%, #5cd65c 100%)",
                color: "white",
                borderRadius: "15px",
                padding: "15px",
                position: "relative",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "gold",
                  borderRadius: "50%",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {player2.overall_rating}
              </div>
              <Card.Img
                variant="top"
                src={player2.image}
                style={{
                  objectFit: "contain",
                  height: "250px",
                  margin: "10px auto",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Card.Body>
                <Card.Title>{player2.name}</Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Graphs Section */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Radar Chart</Accordion.Header>
          <Accordion.Body>
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
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Recharts Bar Chart</Accordion.Header>
          <Accordion.Body>
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
                <Bar dataKey="player1" fill="#8884d8" />
                <Bar dataKey="player2" fill="#82ca9d" />
              </BarChart>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Nivo Bar Chart</Accordion.Header>
          <Accordion.Body>
            {barData && (
              <div style={{ height: "400px" }}>
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
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ComparePlayersScreen;
