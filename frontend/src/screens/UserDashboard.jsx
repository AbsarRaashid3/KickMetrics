import React from "react";
import { useGetUserDashboardQuery, useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from '../redux/slices/externalApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Card,  Button, Row, Col, Container, Accordion } from 'react-bootstrap';
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Player from '../components/Players';

const UserDashboard = () => {
  const { data: leagues, isLoading: isLoadingLeagues, error: errorLeagues } = useGetUserDashboardQuery();
  const { data: favorites, isLoading: loadingFavorites, error: favError, refetch } = useGetFavoritesQuery();
  const { data: players, isLoading: isLoadingPlayers, error: errorPlayers } = useGetPlayersQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

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

        <Container className="user-dashboard">
          <div className="dashboard-header">
            <h1 >User Dashboard</h1>
            <p className="lead"> Track top leagues, upcoming matches, and manage your favorite players all in one place.</p>
            <h3 className="section-title">
              Ongoing Leagues
            </h3>
          </div>

          <Accordion defaultActiveKey={leagues?.data[0]?.id} >
            {leagues && leagues.data ? (
              leagues.data.slice(0, 2).map((league) => (

                <Accordion.Item eventKey={league.id} >
                  <Accordion.Header >{league.name}</Accordion.Header>
                  <Accordion.Body style={{ background: "linear-gradient(135deg,#223a6a, rgb(86, 103, 136),rgb(184, 137, 153))" }}>

                    <Row className="mt-4">
                      <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                        <img width={"15%"} src={league.image_path} alt={league.name} className="mb-3 img-fluid" />
                      </Col>
                    </Row>

                    <Row className="mt-4 ">
                      <Col xs={12} sm={6} md={3} className="text-center">
                        <h5 className="text-center">Season</h5>
                        <p className="text-center">{league.currentseason.name}</p>
                      </Col>
                      <Col xs={12} sm={6} md={3} className="text-center">
                        <h5 className="text-center">Start Date</h5>
                        <p className="text-center">{league.currentseason.starting_at}</p>
                      </Col>
                      <Col xs={12} sm={6} md={3} className="text-center">
                        <h5 className="text-center">End Date</h5>
                        <p className="text-center">{league.currentseason.ending_at}</p>
                      </Col>
                      <Col xs={12} sm={6} md={3} className="text-center">
                        <h5 className="text-center">Status</h5>
                        <p className="text-center">
                          {(league.currentseason.finished ? "Finished" : "Ongoing")}
                        </p>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col xs={12} className="text-center">
                        <h5 className="text-center">Upcoming Matches</h5>
                      </Col>
                    </Row>

                    <Row className="mt-4 g-4 upcoming-matches">
                      {league.upcoming && league.upcoming.map((match) => {
                        const dateTime = new Date(match.starting_at);
                        const [team1, team2] = match.name.split(" vs ");
                        return (
                          <Col xs={12} sm={6} md={4} lg={3} className="text-center" key={match.id}>
                            <Card className="match-card text-center p-2 " style={{
                              backgroundColor: "white",
                            }}>
                              <Row className="align-items-center">
                                <Col xs={12} className="text-center">
                                  <h6 className="team-name">{team1}</h6>
                                </Col>
                              </Row>
                              <Row className="align-items-center">
                                <Col xs={12} className="vs-container">
                                  <span className="vs-text">VS</span>
                                </Col>
                              </Row>
                              <Row className="align-items-center">
                                <Col xs={12} className="text-center">
                                  <h6 className="team-name">{team2}</h6>
                                </Col>
                              </Row>
                              <div className="match-info mt-1" >
                                <h6 className="league-name">{league.name}</h6>
                                <p>{dateTime.toLocaleDateString()}</p>
                                <p>{dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                              </div>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>

                  </Accordion.Body>
                </Accordion.Item>

              ))
            ) : (
              <p className="text-center text-danger fs-5">No leagues available</p>
            )}

          </Accordion>

          <br></br>
          <br></br>



          {/*  Fav players section*/}
          <h3 className="section-title">Add Favorite Players</h3>
          <select
            className="form-select w-25 mx-auto"

            onChange={handlePlayerSelect}
            defaultValue=""
          >
            <option value="" disabled>Select a Player</option>
            {players?.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </select>

          <Row>
            {favoritePlayers?.map((favorite) => (
              <Col key={favorite._id} sm={12} md={6} lg={4} xl={3}>
                <div className="position-relative">
                  <Player player={favorite} />
                  <Button
                    variant="danger"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 1000
                    }}
                    onClick={() => handleRemoveFavorite(favorite._id)}
                  >
                    X
                  </Button>
                </div>
              </Col>

            ))}

          </Row>




        </Container>

      )}
    </>
  );
};

export default UserDashboard;
