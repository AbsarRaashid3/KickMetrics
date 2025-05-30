import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaFutbol, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Import the logout action
import ThemeToggle from './ThemeToggle';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar className="custom-navbar" expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block align-top"
                alt="Kick Metrics"
              />
              <span
                className="ms-2 d-inline-block text-nowrap"
                style={{
                  backgroundColor: "rgb(160, 169, 165)",
                  backgroundImage: "linear-gradient(135deg,rgb(88, 101, 110), rgb(86, 30, 35))",
                  color: "#fff",
                  padding: "8px 15px",
                  borderRadius: "20px",
                }}
              >
                KICK METRICS
              </span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  {!userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/players'>
                        <Nav.Link><FaFutbol /> Players</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/compare'>
                        <Nav.Link><FaFutbol /> Compare Players</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/performance-analysis'>
                        <Nav.Link><FaFutbol /> Performance Analysis</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/teamC'>
                        <Nav.Link><FaFutbol /> Team Composition</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/whatif'>
                        <Nav.Link><FaFutbol /> What-If Simulator</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/market-value'>
                        <Nav.Link><FaFutbol /> Market Value</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/dashboard'>
                        <Nav.Link><FaFutbol /> Dashboard</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown
                    title={
                      <img
                        src={userInfo?.profilePhoto || '/images/avatar.jpeg'}
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
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><FaUser /> Sign In</Nav.Link>
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