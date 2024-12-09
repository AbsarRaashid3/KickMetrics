import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import { Link } from 'react-scroll';

const PlayerTable = ({ players, removePlayer, handleEditClick }) => (
    <Table responsive bordered hover className="text-center">
        <tbody>
            {players.map((player) => (
                <React.Fragment key={player._id}>
                    <tr>
                        <th colSpan="2" className="bg-primary text-white">
                            Player-{player._id} Information
                        </th>
                        <td>
                            <Button
                                variant="danger"
                                onClick={() => removePlayer(player._id)}
                                className="mr-2 btn-shadow btn-sm btn-sm-square"
                            >
                                Delete
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => handleEditClick(player)}
                                className="mr-2 btn-sm"
                            >
                                Edit
                            </Button>
                        </td>
                    </tr>
                    
                    <tr>
                    <td> </td>
                        <td colSpan="2">
                        {player.image && ( <Image
                            
                                src={player.image}
                                alt={player.name}
                                rounded
                                fluid
                                style={{ maxWidth: '150px', height: 'auto' }}
                            />)}
                        </td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td>{player.full_name}</td>
                    </tr>
                    <tr>
                        <td>Birth Date</td>
                        <td>{player.birth_date}</td>
                    </tr>
                    <tr>
                                   <td>Age</td>
                                 <td>{player.age}</td>
                                </tr>
                                <tr>
                                    <td>Height (cm)</td>
                                    <td>{player.height_cm}</td>
                               </tr>
                                <tr>
                                    <td>Weight (kg)</td>
                                    <td>{player.weight_kgs}</td>
                                </tr>
                                <tr>
                                    <td>Positions</td>
                                    <td>{player.positions}</td>
                                </tr>
                                 <tr>
                                    <td>Nationality</td>
                                     <td>{player.nationality}</td>
                                 </tr>

                                 <tr>
                                     <th colSpan="2" className=" text-primary" style={{ paddingTop: '50px', backgroundColor: 'rgba(80, 136, 173, 0.2);' }}><strong>Skills and Attributes</strong></th>
                                 </tr>
                                 <tr>
                                     <td>Overall Rating</td>
                                     <td>{player.overall_rating}</td>
                                 </tr>
                                 <tr>
                                     <td>Potential</td>
                                     <td>{player.potential}</td>
                                 </tr>
                                 <tr>
                                     <td>Dribbling</td>                                     
                                     <td>{player.dribbling}</td>
                                 </tr>
                                 <tr>
                                     <td>Crossing</td>
                                     <td>{player.crossing}</td>
                                 </tr>
                                 <tr>
                                     <td>Finishing</td>
                                     <td>{player.finishing}</td>
                                 </tr>
                                 <tr>
                                     <td>Freekick Accuracy</td>
                                     <td>{player.freekick_accuracy}</td>
                                 </tr>
                                 <tr>
                                     <td>Long Passing</td>
                                     <td>{player.long_passing}</td>
                                 </tr>
                                 <tr>
                                     <td>Ball Control</td>
                                     <td>{player.ball_control}</td>
                                 </tr>
                                 <tr>
                                     <td>Agility</td>
                                     <td>{player.agility}</td>
                                 </tr>
                                 <tr>
                                     <td>Balance</td>
                                     <td>{player.balance}</td>
                                 </tr>
                                 <tr>
                                     <td>Shot Power</td>
                                     <td>{player.shot_power}</td>
                                 </tr>
                                 <tr>
                                     <td>Stamina</td>
                                     <td>{player.stamina}</td>
                                 </tr>
                                 <tr>
                                     <td>Strength</td>
                                     <td>{player.strength}</td>
                                 </tr>
                                 <tr>
                                     <td>Vision</td>
                                     <td>{player.vision}</td>
                                 </tr>
                                 <br></br>
                    {/* Add other attributes like age, height, and skills here */}
                </React.Fragment>
            ))}
        </tbody>
    </Table>
);

export default PlayerTable;
