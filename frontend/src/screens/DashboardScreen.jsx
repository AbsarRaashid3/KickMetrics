import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const navigate = useNavigate();

  const roles = [
    {
      name: "Football Enthusiasts",
      description: "Personalized player insights and fantasy league tools.",
      image: "/images/fans.jpg",
      route: "/dashboard/users",
    },
    {
      name: "Coaches",
      description: "Tactical tools for team composition and performance tracking.",
      image: "/images/coaches.jpg",
      route: "/dashboard/coaches",
    },
    {
      name: "Analysts & Scouts",
      description: "Data-driven player evaluations and predictive analysis.",
      image: "/images/scouts.jpg",
      route: "/dashboard/scouts",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"> Dashboard</h1>
      <Row>
        {roles.map((role, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card onClick={() => handleCardClick(role.route)} className="dashboard-card">
              <Card.Img variant="top" src={role.image} />
              <Card.Body>
                <Card.Title>{role.name}</Card.Title>
                <Card.Text>{role.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardScreen;
