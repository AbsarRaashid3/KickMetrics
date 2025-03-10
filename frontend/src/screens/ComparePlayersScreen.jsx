import React, { useState,useEffect } from "react";
import { Row, Col, Card, Accordion,Form  } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip } from "recharts";
import { ResponsiveBar } from "@nivo/bar";
import { useGetPlayersQuery } from "../redux/slices/playersApiSlice";

const ComparePlayersScreen = () => {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const { data: players=[], isLoading, error } = useGetPlayersQuery();
  const [images, setImages] = useState({});
  
 // Add data validation logging
 useEffect(() => {
  if (players) {
    console.log("data", players);
    if (players.length > 0) {
      console.log("First player sample:", players[0]);
    }
  }
}, [players]);

  if (isLoading) {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h3>Loading players data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h3>Error loading players: {error.message}</h3>
      </div>
    );
  }
  
 
  const handleSelectPlayer = (player, slot) => {
    const selectedPlayer = players.find(p => p._id === parseInt(player));
    if (slot === 1) {
      setPlayer1(selectedPlayer);
    } else {
      setPlayer2(selectedPlayer);
    }
  };
  const filteredPlayers1 = players.filter((player) =>
    player.name.toLowerCase().includes(search1.toLowerCase())
  );

  const filteredPlayers2 = players.filter((player) =>
    player.name.toLowerCase().includes(search2.toLowerCase())
  );

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
      <h2 style={{ color: "white" }} className="mb-4 text-center">Compare Players</h2>

      {/* Select Players */}
      <Row className="mb-3">
        <Col md={6}>
          <h4 className="mb-4 text-center" style={{ color: "white", borderRadius: "2px", backgroundColor: "#8B0000", padding: "8px" }}>Select Player 1</h4>
          <Form.Control
            type="text"
            placeholder="Search Player 1..."
            value={search1}
            onChange={(e) => setSearch1(e.target.value)}
            className="mb-2"
          />
          <select
            className="form-select"
            onChange={(e) =>
              handleSelectPlayer(e.target.value, 1)
            }
          >
       <option>Select Player</option>
            {filteredPlayers1.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>
        </Col>
        <Col md={6}>
          <h4 className="mb-4 text-center" style={{ color: "white", borderRadius: "2px", backgroundColor: "#8B0000", padding: "8px" }}>Select Player 2</h4>
          <Form.Control
            type="text"
            placeholder="Search Player 2..."
            value={search2}
            onChange={(e) => setSearch2(e.target.value)}
            className="mb-2"
          />
          <select
            className="form-select"
            onChange={(e) =>
              handleSelectPlayer(e.target.value, 2)
            }
          >

<option>Select Player</option>
            {filteredPlayers2.map((player) => (
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
                  "linear-gradient(135deg, #223a6a,rgb(94, 93, 93), #670d0d)",
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
                  background: " linear-gradient(135deg,rgb(126, 115, 27),rgb(176, 214, 227))",
                  borderRadius: "50%",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "1.5rem",
                }}
              >
                {player1.overall_rating}
              </div>
              <Card.Img
                variant="top"
                src={player1.image_url || "/images/default.jpg"}
                  onError={(e) => (e.target.src = "/images/default.jpg")}
                  alt={player1.name}
                style={{
                  objectFit: "contain",
                  height: "250px",
                  margin: "10px auto",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(71, 8, 8, 0.75)",
                }}
              />
              <Card.Body>
                <Card.Title style={{ color: "white" }}>{player1.name}</Card.Title>
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
                  "linear-gradient(135deg, #223a6a,rgb(75, 66, 66), #670d0d)",
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
                  background: " linear-gradient(135deg,rgb(126, 115, 27),rgb(176, 214, 227))",
                  borderRadius: "50%",
                  color: "black",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {player2.overall_rating}
              </div>
              <Card.Img
                variant="top"
                src={player2.image_url || "/images/default.jpg"}
                onError={(e) => (e.target.src = "/images/default.jpg")}
                alt={player2.name}
                style={{
                  objectFit: "contain",
                  height: "250px",
                  margin: "10px auto",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(29, 32, 108, 0.82)",
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
