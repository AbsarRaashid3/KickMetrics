import React, { useState, useMemo, useEffect } from "react";
import { Card, Container, Row, Col, Table, Image, Accordion, Button, Form, Modal } from "react-bootstrap";
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetCoachDashboardQuery, useGetScoutDashboardQuery } from '../redux/slices/externalApiSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CoachDashboard = () => {

  const { data: players, isLoading: isLoadingPlayers, error: errorPlayers } = useGetPlayersQuery();
  const { data: coaches, isLoading: isLoadingCoaches, error: errorCoaches } = useGetCoachDashboardQuery();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter players based on search term
  const searchedPlayer = players?.find(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mentalAttributes = useMemo(
    () =>
      searchedPlayer
        ? [
          { name: "Vision", value: searchedPlayer.vision },
          { name: "Composure", value: searchedPlayer.composure },
          { name: "Reactions", value: searchedPlayer.reactions },
          { name: "Positioning", value: searchedPlayer.positioning },
          { name: "Interceptions", value: searchedPlayer.interceptions },
          { name: "Aggression", value: searchedPlayer.aggression },
        ]
        : [],
    [searchedPlayer]
  );


  // Sticky Notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('coachNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];

  });

  useEffect(() => {
    localStorage.setItem('coachNotes', JSON.stringify(notes));
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

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Function to open modal with selected coach details
  const handleShow = (coach) => {
    setSelectedCoach(coach);
    setShowModal(true);
  };

  if (isLoadingPlayers || isLoadingCoaches ) return (<Loader />);
  if (errorPlayers || errorCoaches ) return <Message variant='danger'> {errorPlayers?.data?.message} </Message>;


  return (
    <Container fluid className="coach-dashboard">
      <div className="dashboard-header">
        <h1 className="title-gradient">Coach Dashboard</h1>
        <p className="lead">Track Player through Meantal Attributes, Analyze Metrics, See Caoches Around there & Take Notes  </p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder={searchedPlayer ? searchedPlayer.name : "Search players by name..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <Row className="stats-section">
        <Col lg={12}>
        <h3 className="section-title">Player Mental Attributes</h3>

          <Card className="stats-card">

            <Card.Body>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mentalAttributes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3498db" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="coaches-section">
        <h2 className="section-title">Coaches Around the Globe</h2>
        <div className="coaches-grid" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          {coaches?.data?.map((coach, index) => (
            <Card
              key={index}
              className="coach-card"
              onClick={() => handleShow(coach)}
            >
              <div className="coach-image-wrapper">
                <Image src={coach.image_path} roundedCircle />
              </div>
              <Card.Body>
                <Card.Title>{coach.name || "Unknown Coach"}</Card.Title>
                <Card.Text>
                  {coach.country?.name || "Country not specified"}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="section-title">Quick Notes</h3>
     <Row  >
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="coach-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCoach?.name}'s Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="coach-profile">
            <Image src={selectedCoach?.image_path} roundedCircle className="profile-image" />
            <div className="country-info">
              <Image src={selectedCoach?.country.image_path} className="country-flag" />
              <h4>{selectedCoach?.country.name}</h4>
            </div>
            <div className="teams-history">
              <h5>Coaching History</h5>
              {(selectedCoach?.teams?.length > 0) ? (
                selectedCoach.teams.map((team, index) => (
                  <div key={index} className="team-entry">
                    <strong>Team {team.team_id}</strong>
                    <p>Period: {team?.start || "N/A"} - {team?.end || "Present"}</p>
                    <p>Status: {team.active ? "Active" : "Inactive"}</p>
                  </div>
                ))
              ) : (
                <p>No coaching history available</p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </Container>
  );
};
export default CoachDashboard;