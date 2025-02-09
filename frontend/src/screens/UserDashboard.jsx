import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = "https://v3.football.api-sports.io/standings";
const API_KEY = "03c1a42e1bed9cc7a72312c1d1aae555";

export default function UserDashboard() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?league=39&season=2023`, {
      headers: {
        "x-apisports-key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStandings(data.response[0].league.standings[0]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Football Dashboard</h1>
      {loading ? (
        <p>Loading standings...</p>
      ) : (
        <div className="row">
          {standings.map((team) => (
            <div key={team.team.id} className="col-md-4 mb-4">
              <Card className="shadow-sm rounded">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={team.team.logo}
                    alt={team.team.name}
                    className="me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h5 className="mb-1">{team.team.name}</h5>
                    <p className="mb-0">Points: {team.points}</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
