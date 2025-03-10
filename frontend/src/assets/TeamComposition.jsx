import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import pitchImage from '../assets/I';
// Category filtering functions.
const isGK = (player) => player.positions && player.positions.includes("GK");
const isDefender = (player) => {
  const pos = player.positions || "";
  return pos.includes("CB") || pos.includes("LB") || pos.includes("RB") || pos.includes("LWB") || pos.includes("RWB");
};
const isMidfielder = (player) => {
  const pos = player.positions || "";
  return pos.includes("CM") || pos.includes("CDM") || pos.includes("CAM") || pos.includes("LM") || pos.includes("RM");
};
const isForward = (player) => {
  const pos = player.positions || "";
  return pos.includes("ST") || pos.includes("CF") || pos.includes("LW") || pos.includes("RW");
};

const TeamCompositionScreen = () => {
  const [formation, setFormation] = useState("4-4-2 (Classic)");
  const [playerType, setPlayerType] = useState("balanced");
  const [strategy, setStrategy] = useState("balanced");
  const [teamData, setTeamData] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state for editing a player.
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(""); // "GK", "DEF", "MID", "FWD"
  const [currentIndex, setCurrentIndex] = useState(null); // for array categories; for GK use 0.
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Generate team by calling backend.
  const generateTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Extract base formation (e.g., "4-4-2") if variant info is appended.
      const baseFormation = formation.includes("(") ? formation.split(" ")[0] : formation;
      const payload = { formation: baseFormation, playerType, strategy };
      const response = await axios.post("http://localhost:8000/api/composeTeam", payload);
      // Overwrite the returned formation with the full selected formation for display.
      const responseData = { ...response.data, formation };
      setTeamData(responseData);
    } catch (err) {
      console.error(err);
      setError("Failed to generate team composition.");
    }
    setLoading(false);
  };

  // Fetch all players (for candidate selection).
  const fetchAllPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allPlayers");
      setAllPlayers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  // Compute team summary string.
  const computeTeamSummary = (data) => {
    const starting_team = data.starting_team;
    const subs = data.substitutes;
    const gk = starting_team.GK;
    const defs = starting_team.DEF;
    const mids = starting_team.MID;
    const fwds = starting_team.FWD;
    const starting_players = [gk, ...defs, ...mids, ...fwds];
    const avgOverall =
      starting_players.reduce((sum, p) => sum + (p.overall_rating || 0), 0) /
      starting_players.length;
    const avgSpeed =
      starting_players.reduce((sum, p) => sum + (p.sprint_speed || 0), 0) /
      starting_players.length;
    const avgStrength =
      starting_players.reduce((sum, p) => sum + (p.strength || 0), 0) /
      starting_players.length;

    const lines = [];
    lines.push(`Formation: GK, ${formation} (Player Type: ${playerType})`);
    lines.push("Starting XI:");
    lines.push(`GK: ${gk.full_name || gk.name} (Overall: ${gk.overall_rating})`);
    lines.push("Defenders:");
    defs.forEach((p) =>
      lines.push(` - ${p.full_name || p.name} (Overall: ${p.overall_rating})`)
    );
    lines.push("Midfielders:");
    mids.forEach((p) =>
      lines.push(` - ${p.full_name || p.name} (Overall: ${p.overall_rating})`)
    );
    lines.push("Forwards:");
    fwds.forEach((p) =>
      lines.push(` - ${p.full_name || p.name} (Overall: ${p.overall_rating})`)
    );
    lines.push(
      `Average Overall: ${avgOverall.toFixed(
        1
      )}, Average Speed: ${avgSpeed.toFixed(1)}, Average Strength: ${avgStrength.toFixed(1)}`
    );
    lines.push("\nSubstitutes:");
    subs.forEach((p) =>
      lines.push(` - ${p.full_name || p.name} (Overall: ${p.overall_rating})`)
    );
    return lines.join("\n");
  };

  // Update insights by sending the new summary to the backend.
  const updateInsights = async (newSummary) => {
    try {
      const response = await axios.post("http://localhost:5000/api/updateInsights", {
        teamSummary: newSummary,
        strategy,
      });
      setTeamData((prev) => ({
        ...prev,
        basic_summary: newSummary,
        advanced_insights: response.data.advanced_insights,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // When opening the edit modal, filter candidate list based on category,
  // excluding players already assigned elsewhere (except the one currently in this slot).
  const openEditModal = (category, index = 0) => {
    setCurrentCategory(category);
    setCurrentIndex(index);
    const usedIDs = new Set();
    // Add IDs from all positions except the one being edited.
    Object.keys(teamData.starting_team).forEach((cat) => {
      if (cat === category) {
        if (Array.isArray(teamData.starting_team[cat])) {
          teamData.starting_team[cat].forEach((p, i) => {
            if (i !== index) usedIDs.add(p._id);
          });
        } else {
          if (category !== "GK") usedIDs.add(teamData.starting_team[cat]._id);
        }
      } else {
        const item = teamData.starting_team[cat];
        if (Array.isArray(item)) {
          item.forEach((p) => usedIDs.add(p._id));
        } else {
          usedIDs.add(item._id);
        }
      }
    });

    let filtered = [];
    if (category === "GK") {
      filtered = allPlayers.filter(isGK);
    } else if (category === "DEF") {
      filtered = allPlayers.filter(isDefender);
    } else if (category === "MID") {
      filtered = allPlayers.filter(isMidfielder);
    } else if (category === "FWD") {
      filtered = allPlayers.filter(isForward);
    }
    // Allow candidate if its ID equals current player; otherwise, filter out if already used.
    let currentPlayerId = null;
    if (category === "GK") {
      currentPlayerId = teamData.starting_team.GK._id;
    } else {
      currentPlayerId = teamData.starting_team[category][index]._id;
    }
    filtered = filtered.filter((cand) => {
      if (cand._id === currentPlayerId) return true;
      return !usedIDs.has(cand._id);
    });
    filtered.sort((a, b) => b.overall_rating - a.overall_rating);
    setCandidates(filtered);
    setSelectedCandidate(filtered[0] || null);
    setModalOpen(true);
  };

  // Confirm change: update local team composition and update insights.
  const confirmChange = () => {
    if (!teamData) return;
    const newTeamData = { ...teamData };
    if (currentCategory === "GK") {
      newTeamData.starting_team.GK = selectedCandidate;
    } else {
      newTeamData.starting_team[currentCategory][currentIndex] = selectedCandidate;
    }
    const newSummary = computeTeamSummary(newTeamData);
    setTeamData({ ...newTeamData, basic_summary: newSummary });
    updateInsights(newSummary);
    setModalOpen(false);
  };

  // Predefined coordinates for starting categories.
  const baseCoordinates = {
    GK: { top: "85%", left: "50%" },
    DEF: { top: "70%", left: "50%" },
    MID: { top: "55%", left: "50%" },
    FWD: { top: "35%", left: "50%" },
  };

  // Evenly distribute players horizontally for a given category.
  const getCategoryPositions = (category, count) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const left = 100 * ((i + 1) / (count + 1)) + "%";
      positions.push({ top: baseCoordinates[category].top, left });
    }
    return positions;
  };

  // Formation options including various formats.
  const formationOptions = [
    "4-4-2 (Classic)",
    "4-4-2 (Diamond)",
    "4-4-2 (Flat)",
    "4-3-3",
    "3-5-2",
    "4-2-3-1",
    "4-5-1",
    "5-2-3",
    "5-3-2",
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Optimal Team Composition</h1>
      <form style={styles.form} onSubmit={generateTeam}>
        <div style={styles.formGroup}>
          <label>Formation:</label>
          <select value={formation} onChange={(e) => setFormation(e.target.value)}>
            {formationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Player Type:</label>
          <select value={playerType} onChange={(e) => setPlayerType(e.target.value)}>
            <option value="attacking">Attacking</option>
            <option value="defensive">Defensive</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Strategic Preference:</label>
          <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
            <option value="offensive">Offensive</option>
            <option value="defensive">Defensive</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>
        <button type="submit" style={styles.submitButton}>Generate Team</button>
      </form>
      {loading && <p style={styles.loading}>Generating team composition...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {teamData && (
        <div style={styles.teamContainer}>
          <div style={styles.pitchContainer}>
            <div style={styles.pitch}>
              {/* Render GK */}
              <div style={{ ...styles.position, ...baseCoordinates.GK }}>
                <GiAmericanFootballPlayer size={28} color="#fff" />
                <div style={styles.playerName}>
                  {teamData.starting_team.GK.full_name || teamData.starting_team.GK.name}
                </div>
                <div style={styles.playerStats}>
                  Overall: {teamData.starting_team.GK.overall_rating}
                </div>
                <button style={styles.editButton} onClick={() => openEditModal("GK", 0)}>Edit</button>
              </div>
              {/* Render Defenders */}
              {(() => {
                const defs = teamData.starting_team.DEF;
                const positions = getCategoryPositions("DEF", defs.length);
                return defs.map((player, idx) => (
                  <div key={"def" + idx} style={{ ...styles.position, ...positions[idx] }}>
                    <GiAmericanFootballPlayer size={28} color="#fff" />
                    <div style={styles.playerName}>
                      {player.full_name || player.name}
                    </div>
                    <div style={styles.playerStats}>
                      Overall: {player.overall_rating}
                    </div>
                    <button style={styles.editButton} onClick={() => openEditModal("DEF", idx)}>Edit</button>
                  </div>
                ));
              })()}
              {/* Render Midfielders */}
              {(() => {
                const mids = teamData.starting_team.MID;
                const positions = getCategoryPositions("MID", mids.length);
                return mids.map((player, idx) => (
                  <div key={"mid" + idx} style={{ ...styles.position, ...positions[idx] }}>
                    <GiAmericanFootballPlayer size={28} color="#fff" />
                    <div style={styles.playerName}>
                      {player.full_name || player.name}
                    </div>
                    <div style={styles.playerStats}>
                      Overall: {player.overall_rating}
                    </div>
                    <button style={styles.editButton} onClick={() => openEditModal("MID", idx)}>Edit</button>
                  </div>
                ));
              })()}
              {/* Render Forwards */}
              {(() => {
                const fwds = teamData.starting_team.FWD;
                const positions = getCategoryPositions("FWD", fwds.length);
                return fwds.map((player, idx) => (
                  <div key={"fwd" + idx} style={{ ...styles.position, ...positions[idx] }}>
                    <GiAmericanFootballPlayer size={28} color="#fff" />
                    <div style={styles.playerName}>
                      {player.full_name || player.name}
                    </div>
                    <div style={styles.playerStats}>
                      Overall: {player.overall_rating}
                    </div>
                    <button style={styles.editButton} onClick={() => openEditModal("FWD", idx)}>Edit</button>
                  </div>
                ));
              })()}
            </div>
          </div>
          <div style={styles.insightsContainer}>
            <h2>Team Insights</h2>
            <pre style={styles.summary}>{teamData.basic_summary}</pre>

            </div>
          <div style={styles.insightsContainer}>
  <h3 style={styles.advancedHeading}>Advanced Insights</h3>
  <p style={styles.advancedText}>
    {teamData.advanced_insights.split("\n").map((line, index) => {
      if (line.startsWith("**")) {
        // Convert **bold** syntax to actual bold text
        return (
          <strong key={index}>
            {line.replace(/\*\*/g, "")}
            <br />
          </strong>
        );
      }
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    })}
  </p>
</div>

        
          <div style={styles.subsContainer}>
            <h2>Substitutes</h2>
            <div style={styles.subsList}>
              {teamData.substitutes.map((sub) => (
                <div key={sub._id} style={styles.subItem}>
                  <GiAmericanFootballPlayer size={20} color="#fff" />
                  <span style={styles.subName}>{sub.full_name || sub.name}</span>
                  <span style={styles.subRating}>Overall: {sub.overall_rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Edit {currentCategory} Player</h3>
            <select
              value={selectedCandidate ? selectedCandidate._id : ""}
              onChange={(e) => {
                const candidate = candidates.find(c => c._id === parseInt(e.target.value));
                setSelectedCandidate(candidate);
              }}
            >
              {candidates.map((cand) => (
                <option key={cand._id} value={cand._id}>
                  {cand.full_name || cand.name} (Overall: {cand.overall_rating})
                </option>
              ))}
            </select>
            <div style={styles.modalButtons}>
              <button style={styles.modalButton} onClick={confirmChange}>
                Confirm Change & Update Insights
              </button>
              <button style={styles.modalButton} onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto 20px auto",
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#000",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#fff",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
  teamContainer: {
    marginTop: "20px",
  },
  pitchContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    height: "600px",
    margin: "0 auto",
    border: "2px solid #fff",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundImage: `url(${pitchImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  pitch: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  position: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  playerName: {
    marginTop: "4px",
    fontWeight: "bold",
    fontSize: "14px",
    textShadow: "1px 1px 2px #000",
  },
  playerStats: {
    fontSize: "12px",
    marginTop: "2px",
  },
  editButton: {
    marginTop: "5px",
    padding: "4px 8px",
    fontSize: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#000",
    cursor: "pointer",
  },
  insightsContainer: {
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
    margin: "20px auto",
    maxWidth: "800px",
  },
  summary: {
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  advancedHeading: {
    marginTop: "20px",
    color: "#FFD700",
  },
  advancedText: {
    fontSize: "14px",
  },
  subsContainer: {
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
    margin: "20px auto",
    maxWidth: "800px",
  },
  subsList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  subItem: {
    margin: "10px",
    padding: "10px",
    backgroundColor: "#444",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "120px",
  },
  subName: {
    marginTop: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "center",
  },
  subRating: {
    fontSize: "12px",
    marginTop: "2px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  modalButtons: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-around",
  },
  modalButton: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#000",
    cursor: "pointer",
  },
};

export default TeamCompositionScreen;
