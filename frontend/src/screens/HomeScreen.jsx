import { Row, Col } from 'react-bootstrap';
import players from '../players';
import Player from '../components/Players';

const HomeScreen = () => {
  return (
    <>
      <h1>--Players--</h1>
      <Row>
        {players.map((player) => (
          <Col key={player._id} sm={12} md={6} lg={4} xl={3}>
            <Player player={player} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
