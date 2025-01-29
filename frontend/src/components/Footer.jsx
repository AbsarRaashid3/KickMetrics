import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../assets/styles/index.css"; // Adjust based on your actual project structure


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <Container>
        <Row className="footer-top py-4">
          <Col md={4} className="footer-about">
            <h5>About KickMetrics</h5>
            <p>
              KickMetrics provides cutting-edge football analytics, player insights,
              and performance predictions to empower coaches, scouts, and football enthusiasts.
            </p>
          </Col>
          <Col md={4} className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="/players">Players</a>
              </li>
              <li>
                <a href="/compare">Compare Players</a>
              </li>
              <li>
                <a href="/market-value">Market Value</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="footer-social">
            <h5>Connect with Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom text-center py-3">
          <Col>
            <p>
              &copy; {currentYear} KickMetrics. All rights reserved. |{" "}
              <a href="/privacy-policy">Privacy Policy</a> |{" "}
              <a href="/terms-of-service">Terms of Service</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
