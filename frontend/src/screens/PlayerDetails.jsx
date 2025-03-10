import React, { useMemo,useState} from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Accordion } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useGetPlayerDetailsQuery } from "../redux/slices/playersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
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
  const [transform, setTransform] = useState('');
  const { id: playerId } = useParams();
  const { data: player, isLoading, error } = useGetPlayerDetailsQuery(playerId);

  // ensure the array is only recalculated when the player data changes, not on every render.
  const physicalAttributes = useMemo(() =>player? [
          { name: "Height (cm)", value: player.height_cm },
          { name: "Weight (kg)", value: player.weight_kgs },
          { name: "Stamina", value: player.stamina },
          { name: "Strength", value: player.strength },
          { name: "Agility", value: player.agility },
          { name: "Balance", value: player.balance },
        ]
        : [],
    [player]
  );

  const technicalAttributes = useMemo(
    () =>
      player
        ? [
          { name: "Ball Control", value: player.ball_control },
          { name: "Dribbling", value: player.dribbling },
          { name: "Finishing", value: player.finishing },
          { name: "Short Passing", value: player.short_passing },
          { name: "Long Passing", value: player.long_passing },
          { name: "Crossing", value: player.crossing },
        ]
        : [],
    [player]
  );

  const mentalAttributes = useMemo(
    () =>
      player
        ? [
          { name: "Vision", value: player.vision },
          { name: "Composure", value: player.composure },
          { name: "Reactions", value: player.reactions },
          { name: "Positioning", value: player.positioning },
          { name: "Interceptions", value: player.interceptions },
          { name: "Aggression", value: player.aggression },
        ]
        : [],
    [player]
  );

  const skillComparison = useMemo(
    () =>
      player
        ? [
          { name: "Dribbling", player: player.dribbling, average: 75 },
          { name: "Finishing", player: player.finishing, average: 70 },
          { name: "Passing", player: player.short_passing, average: 72 },
          { name: "Vision", player: player.vision, average: 68 },
          { name: "Speed", player: player.sprint_speed, average: 78 },
          { name: "Strength", player: player.strength, average: 70 },
        ]
        : [],
    [player]
  );

  const combinedAttributes = useMemo(
    () =>
      player
        ? [
          {
            name: "Physical",
            value:
              (player.stamina + player.strength + player.agility + player.balance) / 4,
          },
          {
            name: "Technical",
            value:
              (player.ball_control + player.dribbling + player.finishing + player.short_passing) / 4,
          },
          {
            name: "Mental",
            value: (player.vision + player.composure + player.reactions + player.aggression) / 4,
          },
        ]
        : [],
    [player]
  );

  // Gauge chart data
  const gaugeData = useMemo(
    () =>
      player
        ? {
          pacData: [["Label", "Value"], ["PAC", player.sprint_speed]],
          shoData: [["Label", "Value"], ["SHO", player.finishing]],
          pasData: [["Label", "Value"], ["PAS", player.short_passing]],
          driData: [["Label", "Value"], ["DRI", player.dribbling]],
          defData: [["Label", "Value"], ["DEF", player.interceptions]],
          phyData: [["Label", "Value"], ["PHY", player.strength]],
        }
        : {},
    [player]
  );
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const width = card.clientWidth;
    const height = card.clientHeight;
    const xVal = e.nativeEvent.offsetX;
    const yVal = e.nativeEvent.offsetY;
    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);
    const transformString = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    setTransform(transformString);
  };

  const handleMouseOut = () => {
    setTransform('perspective(500px) scale(1) rotateX(0) rotateY(0)');
  };

  const handleMouseDown = () => {
    setTransform('perspective(500px) scale(0.9) rotateX(0) rotateY(0)');
  };

  const handleMouseUp = () => {
    setTransform('perspective(500px) scale(1.1) rotateX(0) rotateY(0)');
  };

  if (isLoading) return (<Loader />);
  if (error) return <Message variant='danger'> {error?.data?.message || error.error} </Message>;

  return (
    <>
      <div className="container mx-auto p-4">
        <Row className="my-6">
        <Col md={6}>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "350px",
            margin: "0 auto",
            background: "linear-gradient(135deg,rgb(166, 132, 132),rgb(68, 15, 15))",
            borderRadius: "20px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.5)",
            color: "white",
            fontFamily: "'Oswald', sans-serif",
            transition: "transform 0.3s",
            transform: transform,
            transition: "transform 0.1s, box-shadow 0.1s",
            boxShadow: transform ? "0px 0px 30px rgba(0, 0, 0, 0.6)" : "none",
          }}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "90px",
              height: "80px",
              background: "linear-gradient(135deg,rgb(43, 7, 7),rgb(42, 37, 120))",
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
              src={player.image_url || "/images/default.jpg"}
              onError={(e) => (e.target.src = "/images/default.jpg")}
              alt={player.name}
            style={{
              width: "100%",
              maxWidth: "250px",
              height: "350px",
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
            background: "linear-gradient(135deg, #223a6a,rgb(223, 223, 223), #670d0d)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
            color:"black",
            transform: transform,
            transition: "transform 0.1s, box-shadow 0.1s",
            boxShadow: transform ? "0px 0px 30px rgba(0,0,0, 0.6)" : "none",
          }}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
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

        {/* Added more space before accordion */}
        <div className="my-5"></div>
        <div className="my-5"></div>

        {/* Graphs Section */}
        <div className="my-5"></div>
        {/* Add space between player card and graphs */}
        <div class="my-5">
        </div>
        {/* Graphs Section */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Physical Attributes</Accordion.Header>
            <Accordion.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={physicalAttributes} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Technical Attributes</Accordion.Header>
            <Accordion.Body>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={technicalAttributes} >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={player.name} dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Mental Attributes</Accordion.Header>
            <Accordion.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mentalAttributes} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Skill Comparison</Accordion.Header>
            <Accordion.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillComparison} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="player" fill="#8884d8" />
                  <Bar dataKey="average" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Overall Attributes (Radar Chart)</Accordion.Header>
            <Accordion.Body>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={combinedAttributes} >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={player.name} dataKey="value" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Gauge Charts</Accordion.Header>
            <Accordion.Body>
              <Row>
                {[gaugeData.pacData, gaugeData.shoData, gaugeData.pasData, gaugeData.driData, gaugeData.defData, gaugeData.phyData].map((data, index) => (
                  <Col xs={6} key={index} className="d-flex justify-content-center">
                    <Chart chartType="Gauge" data={data} options={gaugeOptions} />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>


      </div>
    </>
  );
}
