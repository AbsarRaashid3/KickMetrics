import React, { useState, useMemo, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { useGetScoutDashboardQuery } from '../redux/slices/externalApiSlice';
import { Card, Container, Row, Col, Form } from "react-bootstrap";

const ScoutDashboard = () => {

  const { data: players, isLoading: isLoadingPlayers, error: errorPlayers } = useGetPlayersQuery();
  const { data: transfers, isLoading: isLoadingScouts, error: errorScouts } = useGetScoutDashboardQuery();

  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [comparePlayer, setComparePlayer] = useState("");

  const handleComparePlayerSelect = (e) => {
    const player = players?.find((p) => String(p._id) === e.target.value);
    setComparePlayer(player);
  };

  // Sticky Notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('scoutNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('scoutNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => setNotes([...notes, ""]);

  const updateNote = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const radarData = useMemo(
    () =>
      selectedPlayer ? [
        { attribute: "Dribbling", value: selectedPlayer.dribbling },
        { attribute: "Finishing", value: selectedPlayer.finishing },
        { attribute: "Speed", value: selectedPlayer.sprint_speed },
        { attribute: "Passing", value: selectedPlayer.short_passing },
        { attribute: "Stamina", value: selectedPlayer.stamina },
        { attribute: "Strength", value: selectedPlayer.strength },
      ]
        : [],
    [selectedPlayer]
  );

  if (isLoadingPlayers || isLoadingScouts) return (<Loader />);
  if (errorPlayers || errorScouts) return <Message variant='danger'> {errorPlayers?.data?.message || errorScouts?.data.message} </Message>;

  const handlePlayerSelect = (e) => {
    const player = players?.find((p) => String(p._id) === e.target.value);
    console.log(typeof e.target.value);

    setSelectedPlayer(player);
  };


  const comparisonData = selectedPlayer?.name && comparePlayer?.name
    ? [
      {
        attribute: "Dribbling",
        [selectedPlayer.name]: selectedPlayer.dribbling,
        [comparePlayer.name]: comparePlayer.dribbling,
      },
      {
        attribute: "Finishing",
        [selectedPlayer.name]: selectedPlayer.finishing,
        [comparePlayer.name]: comparePlayer.finishing,
      },
      {
        attribute: "Speed",
        [selectedPlayer.name]: selectedPlayer.sprint_speed,
        [comparePlayer.name]: comparePlayer.sprint_speed,
      },
      {
        attribute: "Passing",
        [selectedPlayer.name]: selectedPlayer.short_passing,
        [comparePlayer.name]: comparePlayer.short_passing,
      },
      {
        attribute: "Strength",
        [selectedPlayer.name]: selectedPlayer.strength,
        [comparePlayer.name]: comparePlayer.strength,
      },
    ]
    : [];


  return (

    <div className="scout-dashboard-container gradient-background ">
      <div className="dashboard-header">
        <h1>Scout Dashboard</h1>
        <h5>
          Advanced player analysis and comparison tools for professional scouting.
        </h5>
      </div>
      <Container fluid className="mt-4">
        <div className="analysis-section mt-5">
          <Row>
            <Col lg={6}>
             
              <div className="player-select-container">
                <h3 className="section-title">Player Analysis</h3>
                <p className="text-center text-light bg-dark px-3 py-3 rounded shadow" style={{
                background:
                  "linear-gradient(135deg, rgba(177, 44, 44, 0.7), rgba(236, 151, 135, 0.7))",
              }}>
                Gain deep insights into player performance with dynamic radar analysis,
                helping scouts make data-driven decisions.
              </p>
                <select className="custom-select" onChange={handlePlayerSelect}>
                  <option value="">Select Primary Player</option>
                  {players?.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPlayer && (
                <div className="radar-chart-container">
                  <h4 className="player-name">{selectedPlayer.name}</h4>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="attribute" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name={selectedPlayer.name}
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Col>

            <Col lg={6}>
              

              <div className="comparison-section">
                <h3 className="section-title">Player Comparison</h3>
                <p className="text-center text-light px-3 py-3 rounded shadow" style={{
                background:
                  "linear-gradient(135deg, rgba(107, 1, 1, 0.7), rgba(255, 99, 71, 0.7))",

              }}>
                Compare players side by side with a powerful bar chart,
                highlighting strengths and key performance metrics for scouts.
              </p>
                <select className="custom-select" onChange={handleComparePlayerSelect}>
                  <option value="">Select Other Player to Compare</option>
                  {players?.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </select>

                {selectedPlayer && comparePlayer && (
                  <div className="comparison-chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="attribute" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={selectedPlayer.name} fill="#8884d8" />
                        <Bar dataKey={comparePlayer.name} fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>

        <div className="mt-5">
          <Row  >
            <div class="header-container">
            <h4 className="section-title">Scouting Notes</h4>
              <div class="header-content">
                <h4 class="header-text">
                  Effortlessly jot down key scouting observations and tactical insights
                  <br></br>
                  with customizable notes keeping your analysis sharp and organized.
                </h4>
              </div>
              <div class="header-border"></div>
            </div>


            <Col >
              <div className="notes-grid">
                {notes.map((note, index) => (
                  <div key={index} className="note-card">
                    <Form.Control
                      as="textarea"
                      value={note}
                      onChange={(e) => updateNote(index, e.target.value)}
                      placeholder="Add scouting observations..."
                      rows={6}
                    />
                    <button className="delete-note" onClick={() => deleteNote(index)}>×</button>
                  </div>
                ))}
                <button className="add-note" onClick={addNote}>+ New Note</button>
              </div>
            </Col>
          </Row>
        </div>


        <div className="transfers-section">
          <h3 className="section-title">Latest Transfer Activities</h3>
          <p className="text-center">
            Stay updated with the latest transfer activities, tracking player movements between clubs in real time. <br></br>
            Get insights into key transfers, including player details, previous clubs, and transfer dates. ⚽📊
          </p>
          <div className="transfer-cards-container">
            <Row className="flex-nowrap">
              {transfers?.data?.map((transfer) => (
                <Col key={transfer.id} xs={12} md={4} lg={3}>
                  <Card className="transfer-card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="player-image-container">
                          <Card.Img
                            src={transfer.player?.image_path || "https://via.placeholder.com/80"}
                            alt={transfer.player?.common_name}
                            className="player-image"
                          />
                        </div>
                        <div className="transfer-details">
                          <Card.Title className="player-name">{transfer.player?.name}</Card.Title>
                          <div className="transfer-info">
                            <span className="from-team">{transfer?.fromteam?.name}</span>
                            <span className="transfer-arrow">→</span>
                            <span className="to-team">{transfer?.toteam?.name}</span>
                          </div>
                          <small>{transfer?.date}</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>




      </Container>
    </div>
  );
};

export default ScoutDashboard;
