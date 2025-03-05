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
import { Table } from "react-bootstrap";
import players from "../players"; // Player data
 // SVG
import footballBg from "../assets/5205447.jpg"; // Background image

const PlayerPerformanceAnalysis = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]._id);
  const [userRole, setUserRole] = useState("coach");
  const [showGraphs, setShowGraphs] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

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


  const fetchAIAnalysis = async () => {
    if (!player) {
      alert("Please select a player first!");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: player.name, // Sending player name correctly
          query: chatInput,
          role: userRole, // Sending selected role
        }),
      });
  
      const data = await response.json();
      setChatResponse(data.response);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      setChatResponse("⚠️ Error fetching analysis. Please try again.");
    }
  };
  
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
      <div style={{ color: "white" }}>
        <h1 className="mb-4 text-center">Player Performance Analysis</h1>
        <p className="mb-6 text-center">
          Player analysis is crucial for identifying strengths, weaknesses, and areas for improvement.
          Coaches, players, scouts, and fans can use these insights to make informed decisions and
          enhance the team's overall performance.
        </p>
      </div>

      
    </div>
  </div>



      <div className="container mt-4">
        {/* Player and Role Selection */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ color: "white" }}>Select Player</Form.Label>
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
              <Form.Label style={{ color: "white" }}>Select Your Role</Form.Label>
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
         {/* Chatbot Section */}
         <Row className="mb-4">
          <Col>
            <Card 
              style={{
                background: "#f8f9fa",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                background:
                  "linear-gradient(135deg, #223a6a,rgb(222, 210, 210), #670d0d)",
                color:"black",
              }}
             >
              <h3>{player.name}'s Insights</h3>
              <Form.Control
                type="text"
                placeholder="Ask about the player's performance"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <Button className="mt-2" onClick={fetchAIAnalysis}>Ask Your Questions</Button>
              {chatResponse && (
  <p className="mt-3" dangerouslySetInnerHTML={{ __html: chatResponse }} />
)}

            </Card>
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
      <h3 className="text-center black" style={{color: "white"}}>Performance Metrics (Comparison)</h3>

      {/* Line Chart Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h5 className="text-center">Figure 1: Line Chart - Performance Over Time</h5>
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
        
        {/* Table for Line Chart Data */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Category</th>
              <th>Player Performance</th>
              <th>Industry Standard</th>
            </tr>
          </thead>
          <tbody>
            {performanceMetrics.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.value}</td>
                <td>{data.industryStandards}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Bar Chart Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h5 className="text-center">Figure 2: Bar Chart - Performance Distribution</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Table for Bar Chart Data */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Category</th>
              <th>Player Performance</th>
            </tr>
          </thead>
          <tbody>
            {performanceMetrics.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Radar Chart Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <h5 className="text-center">Figure 3: Radar Chart - Skill Comparison</h5>
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

        {/* Table for Radar Chart Data */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Player Score</th>
            </tr>
          </thead>
          <tbody>
            {performanceMetrics.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </div>
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
