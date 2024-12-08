import React from 'react';
import { Container, Table, Row, Col } from "react-bootstrap";
import { FaHeartBroken,FaHeart } from 'react-icons/fa'; // Importing heart icon from FontAwesome (part of React Icons)
import { Button } from 'react-bootstrap'; // React Bootstrap button
//import "./../assets/styles/Dashboard.css"; // For any additional custom styles
import players from "../players";
import Player from '../components/Players';
// import HomeScreen from "./HomeScreen"



const Dashboard = () => {
    const recentSearchIds = [1, 2, 3, 4, 5]; // Example of recent searches (IDs)
    // const limitedPlayers = players.slice(0, 4); 

    const recentPlayers = recentSearchIds.map((id) => players.find((player) =>
        player._id === JSON.stringify(id))).filter((player) => player);      // Remove undefined players

    return (

        <>
            <h2 className="my-4">--Recently Viewed Players--</h2>
            <Container className='box '>
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Full Name</th>
                            <th>Birth Date</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*key={player._id}: A unique key (React requirement for list rendering) is provided using the player's unique ID.*/}
                        {recentPlayers.map((player) => (
                            <tr key={player._id}>
                                <td>{player.name}</td>
                                <td>{player.full_name || "N/A"}</td>
                                <td>{player.birth_date || "N/A"}</td>
                                <td>{player.age || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="my-4">--My Favourite Players--</h2>

                <Button
                    style={{ border: 'none', backgroundColor: 'transparent', color: 'inherit' }}
                    type="button"
                    title="Add Favorite Player"
                    className="d-flex align-items-center"

                >
                    <FaHeart style={{ color: 'red', marginRight: '8px' }}/> Add Player
                </Button>
            </div>

            <Container className='box '>
                {/* <HomeScreen players={limitedPlayers}/> */}
                <Table striped hover responsive>
                    <tbody className="d-flex  align-items-center">
                        {players.map((player) => (
                            <tr key={player._id} sm={12} md={6} lg={4} xl={3}>
                                <td>
                                    <Player player={player} />
                                    <button
                                        className="btn btn-outline-primary"
                                        style={{
                                            fontSize: "0.9rem",
                                            padding: "0.3rem 0.5rem",
                                        }}
                                    >
                                         <FaHeartBroken style={{ color: 'black', marginRight: '8px' }}/>
                                        Remove player 
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </>
    );

};

export default Dashboard;
