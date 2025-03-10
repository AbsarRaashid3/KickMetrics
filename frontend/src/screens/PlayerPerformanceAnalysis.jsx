import React, { useState,useEffect } from "react";
import { motion } from "framer-motion"
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  ResponsiveContainer,
 
  RadarChart,
  LineChart,
  Area,
 // Assuming a heatmap chart package
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  AreaChart,
  ScatterChart, Scatter, RadialBar,RadialBarChart,
  Pie,
  Bar,
  Cell,
  Line,
} from "recharts";
import { ResponsiveBar } from '@nivo/bar'
import { Table } from "react-bootstrap";
 // SVG
import footballBg from "../assets/5205447.jpg"; // Background image
import { useGetPlayersQuery } from "../redux/slices/playersApiSlice";

const industryStandards = [
  // Attacking Attributes
  { category: "Attacking", industryStandards: [86, 95, 70, 92, 86, 97, 93, 94] }, // Crossing, Finishing, Heading Accuracy, Short Passing, Volleys, Dribbling, Curve, Free Kick Accuracy
  
  // Passing Attributes
  { category: "Passing", industryStandards: [92, 79, 96, 94] }, // Short Passing, Long Passing, Ball Control, Vision

  // Physical Attributes
  { category: "Physical", industryStandards: [91, 86, 93, 95, 72, 66, 68] }, // Acceleration, Sprint Speed, Agility, Balance, Stamina, Strength, Jumping

  // Defensive Attributes
  { category: "Defending", industryStandards: [33, 28, 26, 22, 55, 50] }, // Marking, Standing Tackle, Sliding Tackle, Interceptions, Standing Tackle, Sliding Tackle

  // Mental Attributes
  { category: "Mental", industryStandards: [94, 75, 96, 78, 70, 48] }, // Positioning, Penalties, Composure, Reactions, Aggression, Interceptions
];

const COLORS = ["#223a6a", "#8884d8", "#670d0d", "#82ca9d", "#ffc658"];

const PlayerPerformanceAnalysis = () => {
  const { data: players = [], isLoading, error } = useGetPlayersQuery();
  
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [userRole, setUserRole] = useState("coach");
  const [showGraphs, setShowGraphs] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [search, setSearch] = useState("");
  const [isRotating, setIsRotating] = useState(true); // Rotation State

// Initialize selectedPlayerId when data loads
useEffect(() => {
  if (players?.length > 0) {
    setSelectedPlayerId(parseInt(players[0]._id));
  }
}, [players]);

const filteredPlayers = players.filter((player) =>
  player.name.toLowerCase().includes(search.toLowerCase())
);

// Get selected player data
const player = players?.find((p) => p._id === selectedPlayerId) || null;

if (isLoading) {
  return <div className="text-center" style={{ color: "white" }}><h3>Loading players data...</h3></div>;
}

if (error) {
  return <div className="text-center" style={{ color: "white" }}><h3>Error loading players: {error.message}</h3></div>;
}

if (!player) {
  return <div className="text-center" style={{ color: "white" }}><h3>Loading player details...</h3></div>;
}
const performanceMetrics = [
  // Attacking
  { name: "Volleys", value: player.volleys, industryStandards: industryStandards[0].industryStandards[4] },
  { name: "Dribbling", value: player.dribbling, industryStandards: industryStandards[0].industryStandards[5] },
  { name: "Curve", value: player.curve, industryStandards: industryStandards[0].industryStandards[6] },
  { name: "Free Kick Accuracy", value: player.freekick_accuracy, industryStandards: industryStandards[0].industryStandards[7] },

  // Passing
  { name: "Long Passing", value: player.long_passing, industryStandards: industryStandards[1].industryStandards[1] },
  { name: "Vision", value: player.vision, industryStandards: industryStandards[1].industryStandards[3] },

  // Physical
  { name: "Balance", value: player.balance, industryStandards: industryStandards[2].industryStandards[3] },
  { name: "Stamina", value: player.stamina, industryStandards: industryStandards[2].industryStandards[4] },
  { name: "Strength", value: player.strength, industryStandards: industryStandards[2].industryStandards[5] },
  { name: "Jumping", value: player.jumping, industryStandards: industryStandards[2].industryStandards[6] },

  // Defending
 { name: "Sliding Tackle", value: player.sliding_tackle, industryStandards: industryStandards[3].industryStandards[2] },

  // Mental
  { name: "Composure", value: player.composure, industryStandards: industryStandards[4].industryStandards[2] },
  { name: "Reactions", value: player.reactions, industryStandards: industryStandards[4].industryStandards[3] },
  { name: "Aggression", value: player.aggression, industryStandards: industryStandards[4].industryStandards[4] },
];





  const handlePlayerChange = (e) => setSelectedPlayerId(parseInt(e.target.value));
  const handleRoleChange = (e) => setUserRole(e.target.value);
  const toggleGraphs = () => setShowGraphs(!showGraphs);

  const toggleRotation = () => {
    setIsRotating(!isRotating); // Toggle Rotation
  };
  
  const fetchAIAnalysis = async () => {
    if (!player) {
      alert("Please select a player first!");
      return;
    }

    const query = `I want to ask about ${player.name} as a ${userRole} and my question is ${chatInput}`;

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: player?.name, // Sending player name correctly
          query: query,
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
  {/* Player Search and Role Selection */}
  <Row className="mb-4 justify-content-center align-items-center text-center">
    <Col md={6}>
      <Form.Group>
        <Form.Label style={{ color: "white", textAlign: "center" }}>
          Search Player
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Search player by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ textAlign: "center" }}
        />
      </Form.Group>
    </Col>
  </Row>

  {/* Player and Role Selection */}
  <Row className="mb-4 justify-content-center">
    <Col md={6}>
      <Form.Group>
        <Form.Label style={{ color: "white" }}>Select Player</Form.Label>
        <Form.Control
          as="select"
          value={selectedPlayerId}
          onChange={handlePlayerChange}
        >
          <option value="">Select Player...</option>
          {players
            .filter((player) =>
              player.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((player) => (
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
          <option value="">Select Role...</option>
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
              <Button  variant="dark" className="mt-2" onClick={fetchAIAnalysis}>Ask Your Questions</Button>
              {chatResponse && (
  <p className="mt-3" dangerouslySetInnerHTML={{ __html: chatResponse }} />
)}

            </Card>
          </Col>
        </Row>

{/* Graphical Insights Button */}
<Button  variant="dark" onClick={toggleGraphs} className="football-button">
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
        <motion.div
  initial={{ opacity: 0, y: 50 }} // Start from bottom
  animate={{ opacity: 1, y: 0 }}  // Slide up + Fade in
  transition={{ duration: 1.5, ease: "easeOut" }}
>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={performanceMetrics}>
      <CartesianGrid stroke="#333333" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#000000"
        dot={{ r: 5 }} // Dots with radius 5
        activeDot={{ r: 8 }} // Larger dot on hover
        isAnimationActive={true} // Recharts animation
        animationDuration={2000}
      />
      <Line
        type="monotone"
        dataKey="industryStandards"
        stroke="#8884d8"
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
</motion.div>
        
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






<div className="mb-5">
  <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
    <h5 className="text-center">Figure 2: Pie Chart - Performance Contribution</h5>

    {/* Pie Chart with Click Interaction */}
    <motion.div
      onClick={toggleRotation}
      style={{ cursor: "pointer" }}
      animate={isRotating ? { rotate: 360 } : { rotate: 0 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      whileHover={{ scale: 1.05 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={performanceMetrics}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#223a6a"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
          >
            {performanceMetrics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>

    {/* Legend Section */}
    <div className="mt-4 text-center">
      <h6>Performance Breakdown</h6>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {performanceMetrics.map((entry, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: COLORS[index % COLORS.length],
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {entry.name}: {entry.value}
          </motion.li>
        ))}
      </ul>
    </div>
  </div>
</div>


<div className="mb-5">
      {/* Radar Chart Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <h5 className="text-center">Figure 3: Radar Chart - Skill Comparison</h5>
        <motion.div
  initial={{ opacity: 0, scale: 0.8, rotate: -90 }} // Start Hidden + Rotate
  animate={{ opacity: 1, scale: 1, rotate: 0 }} // Scale and Rotate to Normal
  transition={{ duration: 7.5, ease: "easeOut" }} // Smooth Animation
>
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
        </motion.div>

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
      <div className="mb-5">
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
  <h5 className="text-center">Figure 4: Area Chart - Strength vs Weakness</h5>
  <motion.div
  initial={{ opacity: 0, y: 50 }} // Chart will start hidden & slide up
  animate={{ opacity: 1, y: 0 }}  // Chart will fade in and slide into position
  transition={{ duration: 1.5, ease: "easeOut" }} // Smooth Animation
>
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={performanceMetrics}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke="#8884d8" 
        fill="#223a6a" 
        animationBegin={0}  // Start animation immediately
        animationDuration={15000}  // Animation duration in ms
        isAnimationActive={true}  // Activate Recharts built-in animation
      />
    </AreaChart>
  </ResponsiveContainer>
</motion.div>
</div>
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
