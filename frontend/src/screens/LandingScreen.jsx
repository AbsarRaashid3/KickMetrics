import React, { useEffect } from "react";


const LandingScreen = () => {

  useEffect(() => {
    // Apply inline styles to the body
    document.body.style.backgroundColor = "#f4f4f4"; // Set the background color for the entire body
    
    // Ensure the admin is created once when the component mounts

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
    <h2 className="text-white fw-bold fs-5">About KickMetrics</h2>
    <h1 className="text-4xl fw-bold text-info">ANALYZE  OPTIMIZE  WIN</h1>
    <ul className="list-unstyled mt-4" style={{color:"white"}}>
      <li>Track and analyze player performance with real-time data</li>
      <li>Optimize team strategies based on key metrics</li>
      <li>Discover the best formations for peak performance</li>
    </ul>
    <p className="mt-4">
      KickMetrics helps you build the ultimate team by providing in-depth insights into player attributes and tactical effectiveness.
    </p>
    <p className="mt-2">
      No middleman, no hidden data—just pure performance analytics.
    </p>
  </div>
</div>

          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
  <div className="d-flex flex-column justify-content-center">
    <div className="mb-4">
      <h1 className="text-4xl fw-bold text-info">OUR MISSION</h1>
      <p className="mt-4">
        At KickMetrics, we believe that data-driven insights can transform the way football teams perform. Our goal is to empower coaches, players, and analysts with the tools they need to track performance, optimize strategies, and maximize potential.
      </p>
      <p className="mt-2">
        Too many talented players go unnoticed due to a lack of visibility and analytics. KickMetrics bridges that gap by providing real-time performance tracking and tactical analysis.
      </p>
      <p className="mt-2">
        Whether you're refining your squad’s formation or scouting hidden talent, KickMetrics gives you the edge to stay ahead of the game.
      </p>
    </div>

  </div>
  <div className="position-relative">
    <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient rounded-3 transform-rotate"></div>
    <img
      alt="Football players strategizing on the field"
      className="position-relative z-2 rounded-3"
      height="600"
      src="/images/land1.jpg"
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
        A DATA-DRIVEN SOLUTION DEVELOPED BY FOOTBALL ANALYSTS AND COACHES
      </h1>
      <p className="custom-description1">
        KickMetrics is built on insights from top football experts and coaches who understand the challenges of tracking player development. Our platform provides essential performance assessments, helping teams and scouts analyze talent effectively. Every metric and test is designed to provide actionable insights for optimizing player growth and team strategy.
      </p>
      <button className="custom-btn-get-started1">
        KICKMETRICS
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
              src="/images/Absar123.jpg"
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
              src="/images/habiba.jpg"
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
              src="/images/laiba.jpeg"
            />
            <div className="custom-team-info">
              <h2 className="custom-team-name">Laiba Zafar </h2>
              <p className="custom-team-role">FYP'25</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingScreen;
