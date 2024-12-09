import { Navbar, Nav, Container, NavDropdown, NavItem } from 'react-bootstrap';
import { FaFutbol, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Import the logout action
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // Ensure this is only called on events like onClick
  };

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

              {isAuthenticated ? (
                <>
                {/* <NavItem>
                <form class="d-flex ">        
                    <input placeholder="Search" type="search" class="form-control"/>
                    </form>
                </NavItem>
               */}
                  <LinkContainer to='/players'>
                <Nav.Link>
                  <FaFutbol /> Players
                </Nav.Link>
              </LinkContainer>
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



                  <LinkContainer to='/dashboard'>
                    <Nav.Link >
                      Dashboard
                    </Nav.Link>
                  </LinkContainer>
                  
                    <Nav.Link >
                      <ThemeToggle/>
                    </Nav.Link>
                    
                  <NavDropdown
                    title={
                      <img
                        src={user?.profilePhoto || '/images/L. Messi.jpg' } //it will be coming from DB
                        alt='Profile'
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    }
                    id='basic-nav-dropdown'
                    align='end'
                  >

                    <NavDropdown.Item href='#action/3.1'>
                    Edit Profile
                    <Nav.Link >
                      {/* <ThemeToggle/> */}
                    </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>

                  </NavDropdown>

                 
                </>
              ) : (

                <LinkContainer to='/signIn'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;