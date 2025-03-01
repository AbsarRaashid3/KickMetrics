import { Row, Col } from 'react-bootstrap';
import Player from '../components/Players';
import { useGetPlayersQuery } from '../redux/slices/playersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
const HomeScreen = () => {
  const { data: players, isLoading, error } = useGetPlayersQuery();

  return (
    <>
      {isLoading ? (<Loader />) : error ?
        (<Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>) :
        (
          <>
            <h1 style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

            }}>Players</h1>
            <Row>
              {players.map((player) => (
                <Col key={player._id} sm={12} md={6} lg={4} xl={3}>
                  <Player player={player} />
                </Col>
              ))}
            </Row>
          </>
        )
      }

    </>
  );
};

export default HomeScreen;
