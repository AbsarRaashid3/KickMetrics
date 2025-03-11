import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

const PlayerTable = ({ players, removePlayer, handleEditClick }) => (
    <div
        style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f3f3f3, #e3eaf2)',
            borderRadius: '12px',
        }}
    >
        {players.map((player) => (
            <div
                key={player._id}
                style={{
                    minWidth: '350px',
                    border: '2px solid #5088AD',
                    borderRadius: '12px',
                    padding: '20px',
                    background: 'white',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                    flexShrink: 0,
                    transition: 'transform 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '14px',
                    }}
                >
                    <h5 style={{ color: '#2C3E50', fontWeight: 'bold' }}>Player-{player._id}</h5>
                    <div>
                        <Button
                            variant="danger"
                            onClick={() => removePlayer(player._id)}
                            className="mr-2 btn btn-sm"
                            style={{ marginRight: '8px' }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="warning"
                            onClick={() => handleEditClick(player)}
                            className="btn btn-sm"
                        >
                            Edit
                        </Button>
                    </div>
                </div>

                {player.image && (
                    <Image
                        src={player.image}
                        alt={player.name}
                        rounded
                        fluid
                        style={{
                            maxWidth: '100%',
                            height: '160px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '14px',
                        }}
                    />
                )}

                <Table bordered hover responsive style={{ fontSize: '14px', textAlign: 'center' }}>
                    <tbody>
                        <tr style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
                            <td>Full Name</td>
                            <td>{player.full_name}</td>
                            <td>Birth Date</td>
                            <td>{player.birth_date}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{player.age}</td>
                            <td>Height (cm)</td>
                            <td>{player.height_cm}</td>
                        </tr>
                        <tr>
                            <td>Weight (kg)</td>
                            <td>{player.weight_kgs}</td>
                            <td>Nationality</td>
                            <td>{player.nationality}</td>
                        </tr>
                        <tr>
                            <th colSpan="4" style={{ paddingTop: '16px', backgroundColor: 'rgba(80, 136, 173, 0.15)', color: '#2C3E50' }}>
                                <strong>Skills and Attributes</strong>
                            </th>
                        </tr>
                        <tr>
                            <td>Overall Rating</td>
                            <td>{player.overall_rating}</td>
                            <td>Positions</td>
                            <td>{player.positions}</td>
                        </tr>
                        <tr>
                            <td>Potential</td>
                            <td>{player.potential}</td>
                            <td>Dribbling</td>
                            <td>{player.dribbling}</td>
                        </tr>
                        <tr>
                            <td>Crossing</td>
                            <td>{player.crossing}</td>
                            <td>Finishing</td>
                            <td>{player.finishing}</td>
                        </tr>
                        <tr>
                            <td>Freekick Accuracy</td>
                            <td>{player.freekick_accuracy}</td>
                            <td>Long Passing</td>
                            <td>{player.long_passing}</td>
                        </tr>
                        <tr>
                            <td>Ball Control</td>
                            <td>{player.ball_control}</td>
                            <td>Agility</td>
                            <td>{player.agility}</td>
                        </tr>
                        <tr>
                            <td>Balance</td>
                            <td>{player.balance}</td>
                            <td>Shot Power</td>
                            <td>{player.shot_power}</td>
                        </tr>
                        <tr>
                            <td>Stamina</td>
                            <td>{player.stamina}</td>
                            <td>Strength</td>
                            <td>{player.strength}</td>
                        </tr>
                        <tr>
                            <td>Vision</td>
                            <td colSpan="3">{player.vision}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        ))}
    </div>
);

export default PlayerTable;
