import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import {
  BarChart,
  RadarChart,
  LineChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Chart } from "react-google-charts";
import players from "../players";

const gaugeOptions = {
  width: 200,
  height: 200,
  redFrom: 30,
  redTo: 50,
  yellowFrom: 50,
  yellowTo: 70,
  greenFrom: 70,
  greenTo: 100,
  minorTicks: 5,
};

export default function PlayerDetails() {
  const { id: playerId } = useParams();
  const player = players.find((p) => p._id === playerId);

  if (!player) {
    return <div>Player not found</div>;
  }

  const physicalAttributes = [
    { name: "Height (cm)", value: player.height_cm },
    { name: "Weight (kg)", value: player.weight_kgs },
    { name: "Stamina", value: player.stamina },
    { name: "Strength", value: player.strength },
    { name: "Agility", value: player.agility },
    { name: "Balance", value: player.balance },
  ];

  const technicalAttributes = [
    { name: "Ball Control", value: player.ball_control },
    { name: "Dribbling", value: player.dribbling },
    { name: "Finishing", value: player.finishing },
    { name: "Short Passing", value: player.short_passing },
    { name: "Long Passing", value: player.long_passing },
    { name: "Crossing", value: player.crossing },
  ];

  const mentalAttributes = [
    { name: "Vision", value: player.vision },
    { name: "Composure", value: player.composure },
    { name: "Reactions", value: player.reactions },
    { name: "Positioning", value: player.positioning },
    { name: "Interceptions", value: player.interceptions },
    { name: "Aggression", value: player.aggression },
  ];

  const skillComparison = [
    { name: "Dribbling", player: player.dribbling, average: 75 },
    { name: "Finishing", player: player.finishing, average: 70 },
    { name: "Passing", player: player.short_passing, average: 72 },
    { name: "Vision", player: player.vision, average: 68 },
    { name: "Speed", player: player.sprint_speed, average: 78 },
    { name: "Strength", player: player.strength, average: 70 },
  ];

  const combinedAttributes = [
    { name: "Physical", value: (player.stamina + player.strength + player.agility + player.balance) / 4 },
    { name: "Technical", value: (player.ball_control + player.dribbling + player.finishing + player.short_passing) / 4 },
    { name: "Mental", value: (player.vision + player.composure + player.reactions + player.aggression) / 4 },
  ];

  // Gauge chart data
  const pacData = [["Label", "Value"], ["PAC", player.sprint_speed]];
  const shoData = [["Label", "Value"], ["SHO", player.finishing]];
  const pasData = [["Label", "Value"], ["PAS", player.short_passing]];
  const driData = [["Label", "Value"], ["DRI", player.dribbling]];
  const defData = [["Label", "Value"], ["DEF", player.interceptions]];
  const phyData = [["Label", "Value"], ["PHY", player.strength]];

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        <Button className="return-button"> Return to Players List </Button>
      </Link>

      {/* Player Profile and Details Section */}
      <Row className="mb-6">
        <Col md={6}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "350px",
              margin: "0 auto",
              background: "linear-gradient(135deg, #1a202c, #2d3748)",
              borderRadius: "20px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.5)",
              color: "white",
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90px",
                height: "80px",
                background: "linear-gradient(135deg, #ffcc00, #ff9900)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 style={{ color: "white", fontSize: "1rem", margin: 0 }}>
                {player.overall_rating}
              </h3>
            </div>
            <img
              src={player.image}
              alt={player.name}
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "15px",
                margin: "30px auto 10px",
                border: "5px solid rgba(255, 255, 255, 0.2)",
              }}
            />
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                textTransform: "uppercase",
                margin: "10px 0",
              }}
            >
              {player.name}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.8)",
                margin: "5px 0 20px",
              }}
            >
              {player.positions} | {player.nationality}
            </p>
          </div>
        </Col>

        <Col md={6}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Player Details
            </h3>
            <dl className="row">
              <dt className="col-sm-4">Age</dt>
              <dd className="col-sm-8">{player.age}</dd>
              <dt className="col-sm-4">Nationality</dt>
              <dd className="col-sm-8">{player.nationality}</dd>
              <dt className="col-sm-4">Position</dt>
              <dd className="col-sm-8">{player.positions}</dd>
              <dt className="col-sm-4">Overall Rating</dt>
              <dd className="col-sm-8">{player.overall_rating}</dd>
            </dl>
          </div>
        </Col>
      </Row>

      {/* Existing Graphs */}
      {/* Physical Attributes */}
      <div className="mt-5">
        <h3>Physical Attributes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={physicalAttributes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Technical Attributes */}
      <div className="mt-5">
        <h3>Technical Attributes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={technicalAttributes}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name={player.name}
              dataKey="value"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Mental Attributes */}
      <div className="mt-5">
        <h3>Mental Attributes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mentalAttributes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Comparison */}
      <div className="mt-5">
        <h3>Skill Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="player" fill="#8884d8" />
            <Bar dataKey="average" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Attributes Radar Chart */}
      <div className="mt-5">
        <h3>Overall Attribute Comparison (Radar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={combinedAttributes}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name={player.name}
              dataKey="value"
              stroke="#ff7300"
              fill="#ff7300"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Gauge Charts Section */}
      <div className="mt-5">
        <h3>Key Stats (Gauge Charts)</h3>
        <Row>
          <Col xs={6} className="d-flex justify-content-center">
            <Chart chartType="Gauge" data={pacData} options={gaugeOptions} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <Chart chartType="Gauge" data={shoData} options={gaugeOptions} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <Chart chartType="Gauge" data={pasData} options={gaugeOptions} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <Chart chartType="Gauge" data={driData} options={gaugeOptions} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <Chart chartType="Gauge" data={defData} options={gaugeOptions} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <Chart chartType="Gauge" data={phyData} options={gaugeOptions} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
