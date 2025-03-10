import { Row, Col, Form } from 'react-bootstrap';
import Player from '../components/Players';
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const { data: players, isLoading, error } = useGetPlayersQuery();
  const [search, setSearch] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  useEffect(() => {
    if (search === '') {
      setFilteredPlayers(players);
    } else {
      setFilteredPlayers(
        players?.filter((player) =>
          player.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, players]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 style={{ color: "white", textAlign: "center" }}>Players</h1>

          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search Player by Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "50%", margin: "auto" }}
            />
          </Form>

          <Row>
            {filteredPlayers?.length > 0 ? (
              filteredPlayers.map((player) => (
                <Col key={player._id} sm={12} md={6} lg={4} xl={3}>
                  <Player player={player} />
                </Col>
              ))
            ) : (
              <h3 style={{ textAlign: "center", color: "white" }}>No Players Found</h3>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
