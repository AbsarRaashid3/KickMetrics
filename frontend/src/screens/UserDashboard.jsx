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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Football Dashboard</h1>
      {loading ? (
        <p>Loading standings...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {standings.map((team) => (
            <Card key={team.team.id} className="p-4 shadow-md rounded-lg">
              <CardContent className="flex items-center space-x-4">
                <img src={team.team.logo} alt={team.team.name} className="w-12 h-12" />
                <div>
                  <h2 className="text-lg font-semibold">{team.team.name}</h2>
                  <p>Points: {team.points}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
