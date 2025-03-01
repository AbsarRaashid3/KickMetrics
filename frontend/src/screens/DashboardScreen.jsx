// Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// Import CSS for additional styles

const roles = [
  {
    name: "Football Enthusiasts",
    description: "Personalized player insights and fantasy league tools.",
    image: "https://storage.googleapis.com/a1aa/image/8wx5phCgwBtXiJoB5xje96yAtcaGWxLftr_7Cw91zTU.jpg",
    route: "/dashboard/users",
    bgColor: "bg-dark text-white",
  },
  {
    name: "Coaches",
    description: "Tactical tools for team composition and performance tracking.",
    image: "https://storage.googleapis.com/a1aa/image/fgbp-WbplOGGdm_pi2xfTJs5Ocds1uzhDrOiP0zKTgQ.jpg",
    route: "/dashboard/coaches",
    bgColor: "bg-primary text-white",
  },
  {
    name: "Analysts & Scouts",
    description: "Data-driven player evaluations and predictive analysis.",
    image: "https://storage.googleapis.com/a1aa/image/tJRC5dimgBtK2JP7wnV0umnOuy81MtH85f4SncWcgIg.jpg",
    route: "/dashboard/scouts",
    bgColor: "bg-danger text-white",
  },
];

const DashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{color:"white"}}>Dashboard</h1>
      <div className="row">
        {roles.map((role, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div
              className={`card ${role.bgColor} h-100 dashboard-card`}
              onClick={() => navigate(role.route)}
            >
              <img
                src={role.image}
                alt={role.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{role.name}</h5>
                <p className="card-text">{role.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
