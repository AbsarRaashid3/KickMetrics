import React, { useEffect } from "react";

const createAdmin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const email = "admin@gmail.com";
  if (users[email]) {
    return false; // Don't create the admin if present
  }

  users[email] = {
    ...users[email], // Preserve any previous data (if it exists)
    email: email,
    password: "admin@123",
    username: "admin",
    authToken: "jwt-token",
    isAdmin: true,
  };

  // Store the updated users collection back in localStorage
  localStorage.setItem("users", JSON.stringify(users));
};

const LandingScreen = () => {

  useEffect(() => {
    // Apply inline styles to the body
    document.body.style.backgroundColor = "#f4f4f4"; // Set the background color for the entire body
    
    // Ensure the admin is created once when the component mounts
    createAdmin();

    // Cleanup function to reset background color when the component unmounts
    return () => {
      setTimeout(() => {
        document.body.style.backgroundColor = ''; // Reset the background color on unmount
      }, 0);
    };
  }, []);

  return (
    <>
      <div className="custom-football-result-container">
        <img
          alt="A man in a white shirt holding a soccer ball under his arm"
          className="custom-background-image"
          src="https://storage.googleapis.com/a1aa/image/O9qoj8koUaMbIFPCYylKY_WU0blSdtGUJ0U_1Vws1JU.jpg"
        />
        <div className="custom-overlay"></div>
        <div className="custom-content">
          <h1 className="custom-heading">
            Get The
            <br />
            Result
            <br />
            You Want in
            <br />
            <span className="custom-highlight">Football</span>
          </h1>
          <button className="custom-button">Read more</button>
        </div>
        <div className="custom-social-links">
          Twitter Facebook Instagram
        </div>
      </div>

      <div className="section2">
        <div className="container py-4">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="position-relative">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient rounded-3" style={{ background: 'linear-gradient(135deg, rgba(107, 1, 1, 0.7), rgba(255, 99, 71, 0.7))' }}></div>

              <img
                alt="A football player in red uniform kicking a ball"
                className="position-relative z-2 rounded-3"
                height="600"
                  src="/images/peakpx.jpg"
                width="400"
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div className="mb-4">
                <h2 className="text-white fw-bold fs-5">About the Club</h2>
                <h1 className="text-4xl fw-bold text-info">WITH US YOU CAN</h1>
                <ul className="list-unstyled mt-4">
                  <li>Measure and track your players' progress</li>
                  <li>Easily enter and update player data</li>
                  <li>Get noticed by scouts from around the world</li>
                </ul>
                <p className="mt-4">
                  Don't let your players' talent go unnoticed. Sign up for WeFeelSports today and start showcasing your team's potential to the world.
                </p>
                <p className="mt-2">
                  Player's names won't be visible. No middleman, no bypass.
                </p>
              </div>
              <button className="mt-4 btn btn-outline-danger">Get Started For Free</button>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
            <div className="d-flex flex-column justify-content-center">
              <div className="mb-4">
              
                <h1 className="text-4xl fw-bold text-info">OUR MISSION</h1>
                <p className="mt-4">
                  Anže was an extremely talented football player from Cerknica (Slovenia) with a dream of going pro. Despite his amazing skill and dedication,
                </p>
                <p className="mt-2">
                  Despite his disappointment, Anže continued to play and coach football at a local level, finding joy in helping others pursue their own dreams.
                </p>
                <p className="mt-2">
                  Today, we are looking back at his performance with big regret and questions of what he could have become.
                </p>
              </div>
              <button className="mt-4 btn btn-outline-danger">Get Started For Free</button>
            </div>
            <div className="position-relative">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient rounded-3 transform-rotate"></div>
              <img
                alt="Three football players in red uniforms holding footballs"
                className="position-relative z-2 rounded-3"
                height="600"
                src="/images/peakpx (1).jpg"
                width="400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="custom-landing-container1">
        <div className="custom-background-image1">
          <div className="custom-overlay1"></div>
          <div className="custom-content1">
            <h1 className="custom-heading1">
              A SOLUTION BASED ON YEARS OF EXPERIENCE BY THE EXPERTS AND COACHES
            </h1>
            <p className="custom-description1">
              All the assessment were defined by the football experts worldwide with years of experience with the problem of gathering relevant development information of young new talented players. The essential tests and assessments that are covered within the application "WeFeelSports" are described in detail within WeFeelSports Testing Methodology.
            </p>
            <button className="custom-btn-get-started1">
              Get Started For Free
            </button>
          </div>
        </div>
      </div>

      <div className="custom-team-container">
        <div className="custom-heading-container">
          <h1 className="custom-heading">
            OUR TEAM
            <span className="custom-heading-overlay">OUR TEAM</span>
          </h1>
        </div>
        <div className="custom-team-members">
          <div className="custom-team-member">
            <img
              alt="Portrait of Michelle Chu, Director of Technology"
              className="custom-team-image"
              src="/images/absar.jpg"
            />
            <div className="custom-team-info">
              <h2 className="custom-team-name">Absar Rashid</h2>
              <p className="custom-team-role">FYP'25</p>
            </div>
          </div>
          <div className="custom-team-member">
            <img
              alt="Portrait of Tony Eades, Chief Strategy Officer"
              className="custom-team-image"
              src="/images/habiba2.jpg"
            />
            <div className="custom-team-info">
              <h2 className="custom-team-name">Habiba Saleem</h2>
              <p className="custom-team-role">FYP'25</p>
            </div>
          </div>
          <div className="custom-team-member">
            <img
              alt="Portrait of Jason Feller, Business Unit Director"
              className="custom-team-image"
              src="/images/habshi.jpg"
            />
            <div className="custom-team-info">
              <h2 className="custom-team-name">Habshi </h2>
              <p className="custom-team-role">FYP'25</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingScreen;
