import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaFutbol, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <img
              src={logo}
              height='30'
              width='30'
              className='d-inline-block align-top'
              alt='Kick Metrics'
            />

          KICK METRICS

          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/players'>
                 <FaFutbol /> Players
              </Nav.Link>
              <Nav.Link href='/login'>
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;