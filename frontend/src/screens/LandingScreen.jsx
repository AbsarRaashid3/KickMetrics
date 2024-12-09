import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingScreen = () => {
  const styles = {
    landingScreen: {
      backgroundImage: "url('/images/landing-background.png')", // Path to the background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      padding: "50px 0",
      minHeight: "100vh",
      position: "relative", // Required for overlay positioning
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    contentWrapper: {
      position: "relative",
      zIndex: 2,
      color: "white",
    },
    headerFix: {
        position: "relative",
        zIndex: 3, // Ensure header is above the overlay and content
      },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
    },
    description: {
      fontSize: "1.25rem",
      marginBottom: "40px",
      textAlign: "center",
      lineHeight: "1.8",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "50px",
    },
    button: {
      fontSize: "1.2rem",
      padding: "12px 30px",
      borderRadius: "50px",
      transition: "all 0.3s ease",
      backgroundColor: "#007bff",
      borderColor: "#007bff",
      color: "white",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    imageContainer: {
      textAlign: "center",
    },
    image: {
      maxWidth: "90%",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
    },
    imageHover: {
      transform: "scale(1.05)",
    },
    featuresTitle: {
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "40px",
      fontWeight: "bold",
    },
    rowSpacing: {
      marginBottom: "30px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.85)",
      border: "none",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    cardText: {
      color: "#333",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.landingScreen}>
      <div style={styles.overlay}></div>
      <div style={styles.contentWrapper}>
        <Container>
          <Row>
            <Col>
              <h1 style={styles.title}>Welcome to KickMetrics</h1>
              <p style={styles.description}>
                Your ultimate football analytics companion. KickMetrics
                provides cutting-edge insights into player performance, market
                value predictions, and more. Whether you’re a professional
                scout, coach, or fan, explore the possibilities today.
              </p>
            </Col>
          </Row>
          <Row>
            <Col style={styles.buttonContainer}>
              <Button
                variant="primary"
                size="lg"
                as={Link}
                to="/players"
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor =
                    styles.buttonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor =
                    styles.button.backgroundColor)
                }
              >
                Explore Players
              </Button>
            </Col>
          </Row>
          <Row>
          <Col md={12} style={styles.imageContainer}>
              <img
                src="/images/player-graphic.png" // Updated path
                alt="Football Analytics"
                style={{
                  ...styles.image, // Retain existing styles
                  maxWidth: "100%", // Ensure it does not overflow the container
                  height: "auto", // Maintain aspect ratio
                  width: "300px", // Specify the desired width (adjust as needed)
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "scale(1)")
                }
              />
            </Col>

          </Row>
          <Row>
            <Col>
              <h3 style={styles.featuresTitle}>Our Features</h3>
            </Col>
          </Row>
          <Row style={styles.rowSpacing}>
            {[
              {
                title: "Player Comparison",
                text: "Compare players side-by-side with interactive visualizations of performance metrics.",
              },
              {
                title: "Performance Analysis",
                text: "Get detailed insights into player strengths and weaknesses with automated recommendations.",
              },
              {
                title: "Market Value Prediction",
                text: "Predict player market values based on performance metrics and trends.",
              },
            ].map((feature, index) => (
              <Col md={4} key={index} style={{ marginBottom: "20px" }}>
                <Card
                  style={styles.card}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.cardHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, styles.card)
                  }
                >
                  <Card.Body>
                    <Card.Title style={styles.cardTitle}>
                      {feature.title}
                    </Card.Title>
                    <Card.Text style={styles.cardText}>
                      {feature.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            {[
              {
                title: "Team Strategy Planning",
                text: "Build optimal team compositions with strategic insights and recommendations.",
              },
              {
                title: "Interactive Dashboards",
                text: "Access a customizable, user-friendly dashboard with key metrics for favorite players.",
              },
              {
                title: "What-If Simulations",
                text: "Simulate performance scenarios to predict player or team outcomes.",
              },
            ].map((feature, index) => (
              <Col md={4} key={index} style={{ marginBottom: "20px" }}>
                <Card
                  style={styles.card}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.cardHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, styles.card)
                  }
                >
                  <Card.Body>
                    <Card.Title style={styles.cardTitle}>
                      {feature.title}
                    </Card.Title>
                    <Card.Text style={styles.cardText}>
                      {feature.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingScreen;
