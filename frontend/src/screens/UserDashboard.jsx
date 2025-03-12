import React from "react";
import { useGetUserDashboardQuery, useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from '../redux/slices/externalApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Card, Button, Row, Col, Container, Accordion } from 'react-bootstrap';
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Player from '../components/Players';
import { useState, useEffect } from 'react';

const UserDashboard = () => {
  const { data: leagues, isLoading: isLoadingLeagues, error: errorLeagues } = useGetUserDashboardQuery();
  const { data: favorites, isLoading: loadingFavorites, error: favError, refetch } = useGetFavoritesQuery();
  const { data: players, isLoading: isLoadingPlayers, error: errorPlayers } = useGetPlayersQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoadingPlayers) return (<Loader />);
  if (errorPlayers) return <Message variant='danger'> {errorPlayers?.data?.message} </Message>;

  const favoritePlayerIds = favorites?.map(fav => fav.playerId);
  const favoritePlayers = players?.filter(player =>
    favoritePlayerIds?.includes(Number(player._id))
  );
  // Function to handle adding a favorite player
  const handlePlayerSelect = async (e) => {
    const playerId = e.target.value;
    if (playerId) {
      try {
        await addFavorite(playerId);
        refetch();
      } catch (err) {
        console.error('Failed to add favorite:', err);
      }
    }
  };

  const handleRemoveFavorite = async (playerId) => {
    try {
      await removeFavorite(playerId);
      refetch();
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  return (
    <>
      {(isLoadingLeagues || loadingFavorites) ? (
        <Loader />
      ) : (errorLeagues || favError) ? (
        <Message variant='danger'>
          {errorLeagues?.data?.message}
        </Message>
      ) : (

        <Container className="user-dashboard ">
          <div className="dashboard-header">
            <h1 >User Dashboard</h1>
            <h5> Track top leagues, upcoming matches, and manage your favorite players all in one place.</h5>
          </div>
          <div className="d-flex justify-content-center">
            <div
              style={{
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                color: "white",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)",
                fontFamily: "Arial, sans-serif",
                maxWidth: "500px",
                margin: "0 auto",
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                opacity: isVisible ? 1 : 0,
                transition: "all 0.5s ease-in-out",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  marginBottom: "6px",
                  animation: "pulse 2s infinite"
                }}
              >
                ⚡ Live the Game, Feel the Action!
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  margin: "0",
                  opacity: "0.9"
                }}
              >
                Get real-time updates on leagues, track match schedules, and never miss a game again! 🏆⏳
              </p>
            </div>

            <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>
          </div>


          <Row className="justify-content-center custom-accordion-container">
            {leagues && leagues.data ? (
              <Col xs={12} lg={10}>
                <Row className="g-4">
                  {leagues.data.slice(0, 2).map((league) => (
                    <Col xs={12} md={6} key={league.id}>
                      <Accordion defaultActiveKey="0" className="custom-accordion">
                        <Accordion.Item eventKey={league.id}>
                          <Accordion.Header>{league.name}</Accordion.Header>
                          <Accordion.Body style={{
                            background: "linear-gradient(135deg,rgb(62, 79, 146),rgb(95, 20, 20),rgb(131, 110, 67))",
                            padding: "20px"
                          }}>
                            {/* League Logo */}
                            <Row className="mt-4">
                              <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                                <img width={"30%"} src={league.image_path} alt={league.name} className="mb-3 img-fluid" />
                              </Col>
                            </Row>

                            {/* Season Info Grid */}
                            <Row className=" text-white g-3 justify-content-center">
                              <Col xs={6} sm={3} className="text-center">
                                <h6 className="info-title">Season</h6>
                                <p>{league.currentseason.name}</p>
                              </Col>
                              <Col xs={6} sm={3} className="text-center">
                                <h6 className="info-title">Start Date</h6>
                                <p>{new Date(league.currentseason.starting_at).toLocaleDateString()}</p>
                              </Col>
                              <Col xs={6} sm={3} className="text-center">
                                <h6 className="info-title">End Date</h6>
                                <p>{new Date(league.currentseason.ending_at).toLocaleDateString()}</p>
                              </Col>
                              <Col xs={6} sm={3} className="text-center">
                                <h6 className="info-title">Status</h6>
                                <p
                                  style={{ color: league.currentseason.finished ? "red" : "rgb(115, 197, 132)" }}
                                >
                                  {league.currentseason.finished ? "Finished" : "Ongoing"}
                                </p>

                              </Col>
                            </Row>
                            {/* Upcoming Matches Section */}
                            <hr style={{ borderBottom: "1px", color: "white" }} />

                            <Row >
                              <Col className="text-center">
                                <h3 className="section-title text-white">Upcoming Match</h3>
                              </Col>
                            </Row>

                            <Row className="mt-2 g-4 upcoming-matches">
                              {league.upcoming && league.upcoming.length > 0 ? (
                                league.upcoming.slice(0, 1).map((match) => {
                                  const dateTime = new Date(match.starting_at);
                                  const [team1, team2] = match.name.split(" vs ");
                                  return (
                                    <Col xs={12} sm={6} lg={12} key={match.id}>
                                      <Card className="match-card" style={{
                                        background: "rgba(255, 255, 255, 0.9)",
                                        border: "none",
                                        borderRadius: "15px",
                                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                        transition: "transform 0.3s ease"
                                      }}>
                                        <Card.Body className="pb-0">
                                          <Row className="align-items-center text-center">
                                            <Col xs={5}>
                                              <h6 className="team-name">{team1}</h6>
                                            </Col>
                                            <Col xs={2}>
                                              <span className="vs-text">VS</span>
                                            </Col>
                                            <Col xs={5}>
                                              <h6 className="team-name">{team2}</h6>
                                            </Col>
                                          </Row>
                                          <div className="match-info mt-2">
                                            <p className="league-name mb-1">{league.name}</p>
                                            <p className="match-date">
                                              {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  );
                                })
                              ) : (
                                <Col xs={12} className="text-center text-white">
                                  <p>No upcoming matches available.</p>
                                </Col>
                              )}
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Col>
                  ))}
                </Row>
              </Col>
            ) : (
              <Col xs={12} className="text-center text-danger fs-5">
                <p>No leagues available</p>
              </Col>
            )}
          </Row>

          <br></br>
          <br></br>



        {/*  Fav players section*/}
<div className="favorite-players-section py-4 px-3 my-4" style={{
  background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
}}>
  <div className="text-center mb-4">
    <h3 className="text-white mb-1" style={{
      fontSize: "2rem",
      fontWeight: "bold",
      textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)"
    }}>
      <i className="fas fa-star me-2"></i>
      Add Favorite Players
    </h3>

    <div className="title-underline bg-warning mx-auto mt-2" style={{
      height: "3px",
      width: "200px",
      borderRadius: "3px"
    }}></div>
  </div>
    <p className="mb-1" style={{ fontSize: "1.5rem", fontWeight: "500",textAlign: "center" }}>
    Create your dream lineup by selecting your favorite stars from across the sporting world.
  </p>
  <p className="mb-0" style={{ fontSize: "1rem", opacity: "0.9" ,textAlign: "center"}}>
    Track their stats, upcoming matches, and career highlights all in one customizable dashboard.
  </p>
  <div className="player-select-container mb-4 mt-4">
    <select
      className="form-select mx-auto"
      style={{
        maxWidth: "350px",
        padding: "12px",
        borderRadius: "25px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        border: "none",
        fontWeight: "500",
        background: "rgba(255, 255, 255, 0.9)"
      }}
      onChange={handlePlayerSelect}
      defaultValue=""
    >

      <option value="" disabled> Select a Player</option>
  
      {players?.map((player) => (
        <option key={player._id} value={player._id}>
          {player.name}
        </option>
      ))}
    </select>
  </div>

  <Row className="g-4 px-2">
    {favoritePlayers?.map((favorite) => (
      <Col key={favorite._id} sm={12} md={6} lg={4} xl={3}>
        <div 
          className="position-relative"
          style={{
            transition: "all 0.3s ease",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            border: "3px solid rgba(255, 255, 255, 0.2)"
          }}>
            <Player player={favorite} />
          </div>
          
          <Button
            
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1000,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              fontSize: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              border: '2px solid white'
            }}
            onClick={() => handleRemoveFavorite(favorite._id)}
          >
            X
          </Button>
        </div>
      </Col>
    ))}
  </Row>
  
  {favoritePlayers?.length === 0 && (
    <div className="text-center py-4 text-white">
      <i className="fas fa-user-plus mb-3" style={{ fontSize: "3rem", opacity: "0.7" }}></i>
      <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>Select players to add to your favorites!</p>
    </div>
  )}
</div>



        </Container>

      )}
    </>
  );
};

export default UserDashboard;
