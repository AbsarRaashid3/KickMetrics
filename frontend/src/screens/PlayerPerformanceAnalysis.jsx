import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  ResponsiveContainer,
  BarChart,
  RadarChart,
  LineChart,
 // Assuming a heatmap chart package
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";
import players from "../players"; // Player data
import playerPerformanceSvg from "../assets/players2.png"; // SVG
import footballBg from "../assets/football-bg.jpg"; // Background image

const PlayerPerformanceAnalysis = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]._id);
  const [userRole, setUserRole] = useState("coach");
  const [showGraphs, setShowGraphs] = useState(false);

  const player = players.find((p) => p._id === selectedPlayerId);

  const performanceMetrics = [
    { name: "Crossing", value: player.crossing },
    { name: "Finishing", value: player.finishing },
    { name: "Heading Accuracy", value: player.heading_accuracy },
    { name: "Short Passing", value: player.short_passing },
    { name: "Dribbling", value: player.dribbling },
    { name: "Ball Control", value: player.ball_control },
    { name: "Vision", value: player.vision },
    { name: "Agility", value: player.agility },
    { name: "Strength", value: player.strength },
  ];


  const userRoleInsights = {
    coach: `
      This player demonstrates significant potential for contributing to the team's overall performance.
      While their ball control and dribbling are strong, their crossing and heading accuracy require improvement.
      Consider placing this player in scenarios where their strengths can shine, like quick counterattacks and tight spaces.
    `,
    player: `
      Your performance metrics indicate you excel in dribbling and vision, which are crucial for midfield playmakers.
      Focus on improving your finishing and heading accuracy to become a more versatile player who can contribute
      in multiple scenarios. Training drills on agility and shooting may help you reach the next level.
    `,
    scout: `
      This player is a promising talent with excellent ball control and agility. However, they need to develop
      stronger crossing skills to thrive in high-pressure matches. Their adaptability and potential make them
      a valuable asset for long-term investment and team-building strategies.
    `,
    fan: `
      A dynamic player to watch! Their dribbling and ball control are on par with some of the top-tier athletes
      in the industry. This player has the potential to bring excitement to matches with their flair and
      creative gameplay.
    `,
  };

  const handlePlayerChange = (e) => setSelectedPlayerId(e.target.value);
  const handleRoleChange = (e) => setUserRole(e.target.value);
  const toggleGraphs = () => setShowGraphs(!showGraphs);

  return (
<div> {/* Header Section */}
  <div
    style={{
      backgroundImage: `url(${footballBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      height: "350px",
    }}
  >


    <div className="container d-flex align-items-center" style={{ height: "75%" }}>
      <div style={{ color: "black" }}>
        <h1>Player Performance Analysis</h1>
        <p>
          Player analysis is crucial for identifying strengths, weaknesses, and areas for improvement.
          Coaches, players, scouts, and fans can use these insights to make informed decisions and
          enhance the team's overall performance.
        </p>
      </div>

      <img
        src={playerPerformanceSvg}
        alt="Player Performance"
        style={{
          width: "300px",
          marginLeft: "auto",

        }}
      />
    </div>
  </div>



      <div className="container mt-4">
        {/* Player and Role Selection */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Select Player</Form.Label>
              <Form.Control
                as="select"
                value={selectedPlayerId}
                onChange={handlePlayerChange}
              >
                {players.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Select Your Role</Form.Label>
              <Form.Control as="select" value={userRole} onChange={handleRoleChange}>
                <option value="coach">Coach</option>
                <option value="player">Player</option>
                <option value="scout">Scout</option>
                <option value="fan">Fan</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Insights */}
        <Row className="mb-4">
          <Col>
            <div
              style={{
                background: "#f8f9fa",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{player.name}'s Insights</h3>
              <p style={{ fontStyle: "italic", fontSize: "1.2rem" }}>
                {userRoleInsights[userRole]}
              </p>
            </div>
          </Col>
        </Row>

        {/* Graphical Insights Button */}
        <Button variant="primary" onClick={toggleGraphs} className="football-button">
          Graphical Insights
        </Button>

        {/* Graphs Section */}
        {showGraphs && (
          <div>
            <div className="mb-5">
              <h3 className="text-center black">Performance Metrics (Comparison)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceMetrics}>
                  <CartesianGrid stroke="#333333" strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#000000" />
                  <Line type="monotone" dataKey="industryStandards" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <br>
              </br><br>
              </br>
              <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
              <br>
</br>
<br>
</br>
<br>
</br>

            </ResponsiveContainer>

                        {/* Radar Chart */}
                        <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  name="Player Metrics"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            </div>
            {/* Additional Graphs Like Heatmaps */}
          </div>
        )}
<br>
</br>
<br>
</br>
<br>
</br>
        {/* Cards Section */}
        <Row className="mt-5">
          {[
            {
              title: "Physical Fitness",
              text: "Strength, stamina, and agility are crucial attributes for every football player to dominate on the field.",
              img: "/images/IMG_0491.JPG",
            },
            {
              title: "Technical Skills",
              text: "Dribbling, passing, and shooting determine a player's ability to control the game.",
              img: "/images/IMG_0493.JPG",
            },
            {
              title: "Tactical Awareness",
              text: "Understanding game tactics and positioning can significantly enhance performance.",
              img: "/images/IMG_0494.JPG",
            },
            {
              title: "Mental Toughness",
              text: "Focus, confidence, and resilience are the traits of top-performing athletes.",
              img: "/images/IMG_0495.JPG",
            },
          ].map((card, idx) => (
            <Col key={idx} md={3}>
              <Card>
                <Card.Img variant="top" src={card.img} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PlayerPerformanceAnalysis;
