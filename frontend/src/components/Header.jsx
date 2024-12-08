import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaFutbol, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'; 
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                height='30'
                width='30'
                className='d-inline-block align-top'
                alt='Kick Metrics'
              />
              KICK METRICS
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/players'>
                <Nav.Link>
                  <FaFutbol /> Players
                </Nav.Link>
              </LinkContainer>

              {/* Added Player Comparison Link */}
              <LinkContainer to='/compare'>
                <Nav.Link>
                  <FaFutbol /> Compare Players
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/performance-analysis'>
              <Nav.Link >
                 <FaFutbol />Performance Analysis
              </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/teamC'>
              <Nav.Link >
                 <FaFutbol />Team Composition
              </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/whatif'>
              <Nav.Link >
                 <FaFutbol />What-If Simulator
              </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/market-value'>
              <Nav.Link >
                 <FaFutbol />Market Value
              </Nav.Link>
              </LinkContainer>


              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
