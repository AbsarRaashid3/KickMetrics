import React, { useState, useMemo, useEffect } from "react";
import { Card, Container, Row, Col, Form,Image,Modal } from "react-bootstrap";
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Loader from '../components/Loader';
import { useGetCoachDashboardQuery } from '../redux/slices/externalApiSlice';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Message from '../components/Message';

const CoachDashboard = () => {
  const { data: players, isLoading: isLoadingPlayers, error: errorPlayers } = useGetPlayersQuery();
  const { data: coaches, isLoading: isLoadingCoaches, error: errorCoaches } = useGetCoachDashboardQuery();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter players based on search term
  const searchedPlayer = useMemo(() => {
    if (!searchTerm) return  players?.[0] || null; // If search input is empty, return null
    const foundPlayer = players?.find(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return foundPlayer || "not found"; // Return "not found" if no match
  }, [searchTerm, players]);

  const mentalAttributes = useMemo(
    () =>
      searchedPlayer ? [
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

  // Match Scheduler
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem('coachMatches');
    return savedMatches ? JSON.parse(savedMatches) : [];
  });
  const [matchDetails, setMatchDetails] = useState({
    opponent: '',
    date: '',
    time: '',
    location: '',
  });

  useEffect(() => {
    localStorage.setItem('coachMatches', JSON.stringify(matches));
  }, [matches]);

  const handleMatchChange = (e) => {
    const { name, value } = e.target;
    setMatchDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteMatch = (id) => {
    setMatches((prevMatches) => prevMatches.filter((match) => match.id !== id));
  };

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    if (!matchDetails.opponent || !matchDetails.date || !matchDetails.time || !matchDetails.location) {
      alert('Please fill in all fields');
      return;
    }
    setMatches((prev) => [...prev, { ...matchDetails, id: Date.now() }]);
    setMatchDetails({ opponent: '', date: '', time: '', location: '' });
  };

  if (isLoadingPlayers || isLoadingCoaches) return <Loader />;
  if (errorPlayers || errorCoaches) return (
    <Message variant='danger'>
      {errorPlayers?.data?.message || errorCoaches?.data?.message}
    </Message>
  );

  return (
    <Container fluid className="coach-dashboard gradient-background ">
      <div className="dashboard-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: '700' }}>Coach Dashboard</h1>
        <h5 style={{ color: 'white', fontWeight: '400', fontStyle: 'italic' }}>
          Track Players' Mental Attributes, Analyze Metrics, Connect with Coaches & Take Notes
        </h5>
      </div>

      <>
        <Row className="stats-section">
          <Col lg={6} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="section-title"   >
              🏆 Match Scheduler
            </h3>
            <p className="text-center text-light bg-dark px-3 py-3 rounded shadow" style={{
              background:
                "linear-gradient(135deg, rgba(177, 44, 44, 0.7), rgba(236, 151, 135, 0.7))",
            }}>
              The Match Scheduler allows coaches to efficiently plan and track upcoming matches by adding opponents,
              dates, times, and locations.
              Coaches can also manage the schedule by deleting matches as needed.
            </p>
            <div
              style={{
                background: 'linear-gradient(135deg,rgb(77, 121, 189),rgb(139, 58, 62))',
                padding: '25px',
                borderRadius: '15px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                maxWidth: '550px',
                // margin: 'auto',
              }}
            >
              <form
                onSubmit={handleMatchSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  marginBottom: '20px',
                }}
              >
                <input
                  type="text"
                  name="opponent"
                  value={matchDetails.opponent}
                  onChange={handleMatchChange}
                  placeholder="🏅 Opponent Team"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid rgb(83, 40, 40)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#219653')}
                  onBlur={(e) => (e.target.style.borderColor = '#27ae60')}
                />
                <input
                  type="date"
                  name="date"
                  value={matchDetails.date}
                  onChange={handleMatchChange}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid rgb(83, 40, 40)',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                <input
                  type="time"
                  name="time"
                  value={matchDetails.time}
                  onChange={handleMatchChange}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid rgb(83, 40, 40)',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                <input
                  type="text"
                  name="location"
                  value={matchDetails.location}
                  onChange={handleMatchChange}
                  placeholder="📍 Match Location"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid rgb(83, 40, 40)',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgb(83, 40, 40)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background 0.3s, transform 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#219653')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#27ae60')}
                  onMouseDown={(e) => (e.target.style.transform = 'scale(0.98)')}
                  onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  ➕ Add Match
                </button>
              </form>

              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                📅 Scheduled Matches
              </h4>
              {matches.length === 0 ? (
                <p style={{ color: 'black', textAlign: 'center', fontSize: '1rem' }}>
                  No matches scheduled yet.
                </p>
              ) : (
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
                  {matches.map((match) => (
                    <li
                      key={match.id}
                      style={{
                        padding: '15px',
                        borderRadius: '10px',
                        borderLeft: '5px solid rgb(34, 72, 97)',
                        border: '2px solid rgb(83, 40, 40)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        marginBottom: '10px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'transform 0.2s',
                      }}
                      onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                      onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                    >
                      <span>⚽ {match.opponent} - {match.date} at {match.time} ({match.location})</span>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteMatch(match.id)}
                        style={{
                          background: "none",
                          color: 'white',
                          border: 'none',
                          margin: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          transition: 'background 0.3s',
                        }}
                        onMouseOver={(e) => (e.target.style.background = 'rgb(155, 30, 30)')}
                        onMouseOut={(e) => (e.target.style.background = 'rgb(189, 49, 49)')}
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>

          <Col lg={6} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="section-title">Player Mental Attributes</h3>
            <p className="text-center text-light bg-dark px-3 py-3 rounded shadow" style={{
              background:
                "linear-gradient(135deg, rgba(177, 44, 44, 0.7), rgba(236, 151, 135, 0.7))",
            }}>
              The Player Mental Attributes section helps coaches analyze a player's psychological performance
              over time through a dynamic line chart. Coaches can search for players and visualize
              key mental attributes to assess trends and make informed decisions.
            </p>
            <div className="search-section">
              <input
                type="text"
                placeholder={searchedPlayer ? searchedPlayer.name : "Search players by name..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {searchedPlayer === "not found" ? (
              <Message variant="warning">Player not found</Message>
            ) : searchedPlayer ? (

              <Card className="stats-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={mentalAttributes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="white" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#333", color: "white", borderRadius: "5px", padding: "10px" }}
                        labelStyle={{ fontWeight: "bold" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
        </Row>

        <div className="mt-5">
          <h3 className="section-title">Quick Notes</h3>
          <div style={{
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: 'auto',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.6',
            letterSpacing: '0.5px',
            position: 'relative',
          }}>
            <p style={{ marginBottom: '0' }}>
              ✍️ <strong>Quick Notes:</strong> Coaches can quickly jot down observations, strategies, and player insights.
              This easy-to-use section allows them to add, edit, and delete notes to track key game-time details and training progress.
            </p>
          </div>

          <Row  >
            <Col >
              <div className="notes-grid">
                {notes.map((note, index) => (
                  <div key={index} className="note-card">
                    <Form.Control
                      as="textarea"
                      value={note}
                      onChange={(e) => updateNote(index, e.target.value)}
                      placeholder="Add observations..."
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
        <div >
        <h4 className="section-title">Coaches Around the Globe</h4>
        <div class="header-container">
              <div class="header-content">
                <h4 class="header-text">
                This section highlights top football coaches worldwide, showcasing their expertise and backgrounds.
                 It helps coaches gain visibility, connect with others, and attract opportunities
                 <br></br> in just a Click away! ⚽🌍
                </h4>
              </div>
              <div class="header-border"></div>
            </div>
        <div className="coaches-grid" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          {coaches?.data?.slice(0,6).map((coach, index) => (
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
      </>

    </Container>
  );
};

export default CoachDashboard;