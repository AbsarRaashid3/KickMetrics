
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import React, { useState, useEffect } from 'react';
import PlayerTable from '../components/ViewPlayers';
import AddPlayerForm from '../components/AddPlayerForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import playersData from '../players'
import { validatePlayerInput } from '../FormValidations'


const AdminPanel = () => {
    const [errors, setErrors] = useState('');
    const [players, setPlayers] = useState(playersData);
    const [editPlayer, setEditPlayer] = useState(null);
    const [previewImage, setPreviewImage] = useState(''); // For showing the image preview
    const [newPlayer, setNewPlayer] = useState({
        image: '',
        full_name: '',
        birth_date: '',
        age: '',
        height_cm: '',
        weight_kgs: '',
        positions: '',
        nationality: '',
        overall_rating: '',
        potential: '',
        long_shots: '',
        dribbling: '',
        crossing: '',
        finishing: '',
        heading_accuracy: '',
        short_passing: '',
        volleys: '',
        dribbling: '',
        curve: '',
        freekick_accuracy: '',
        long_passing: '',
        ball_control: '',
        acceleration: '',
        sprint_speed: '',
        agility: '',
        reactions: '',
        balance: '',
        shot_power: '',
        jumping: '',
        stamina: '',
        strength: '',
        aggression: '',
        interceptions: '',
        positioning: '',
        vision: '',
        penalties: '',
        composure: '',
        marking: '',
        standing_tackle: '',
        sliding_tackle: ''
    });

    const convertDate = (e) => {
        let d = e.target.value;
        d = d.split('-'); 
        d = d[1]+"/"+d[2]+"/"+d[0];
        return d;
    };

    // Handle input change for both adding and editing
    const handleInputChange = (name, value) => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear errors when typing

        if (name === 'image' && value instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
                if (editPlayer) {
                    setEditPlayer({ ...editPlayer, image: reader.result });
                } else {
                    setNewPlayer({ ...newPlayer, image: reader.result });
                }
            };
            reader.readAsDataURL(value); // Update the preview when an image is selected
        }
        else {
            if (editPlayer) {
                setEditPlayer({ ...editPlayer, [name]: value });
            } else {
                setNewPlayer({ ...newPlayer, [name]: value });
            }
        }
    };



    //remove player

    const removePlayer = (id) => {
        const updatedPlayers = players.filter((player) => player._id !== id);
        setPlayers(updatedPlayers);
        toast.success('Player removed successfully!');
    };


    // const handleAddPlayerSubmit = (e) => {
    //     e.preventDefault();

    //     const validationErrors = Object.keys(newPlayer).reduce((acc, key) => {
    //         const error = validatePlayerInput(key, newPlayer[key], newPlayer);
    //         if (Object.keys(error).length > 0) {
    //             acc[key] = error[key];
    //         }
    //         return acc;
    //     }, {});

    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return;
    //     }

    //     const playerWithId = { ...newPlayer, _id: players.length + 1 };
    //     setPlayers([...players, playerWithId]);
    //     setNewPlayer({});  // Reset the form state
    //     setPreviewImage('');  // Reset the image preview
    // };
    const handleAddPlayerSubmit = (e) => {
        e.preventDefault();
        const validationErrors = Object.keys(newPlayer).reduce((acc, key) => {
            const error = validatePlayerInput(key, newPlayer[key], newPlayer);
            if (Object.keys(error).length > 0) {
                acc[key] = error[key];
            }
            return acc;
        }, {});
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const playerWithId = { ...newPlayer, _id: players.length + 1 };
        setPlayers([...players, playerWithId]);
        // Reset states
        setNewPlayer({
            image: '',
            full_name: '',
            birth_date: '',
            age: '',
            height_cm: '',
            weight_kgs: '',
            positions: '',
            nationality: '',
            overall_rating: '',
            potential: '',
            long_shots: '',
            dribbling: '',
            crossing: '',
            finishing: '',
            heading_accuracy: '',
            short_passing: '',
            volleys: '',
            curve: '',
            freekick_accuracy: '',
            long_passing: '',
            ball_control: '',
            acceleration: '',
            sprint_speed: '',
            agility: '',
            reactions: '',
            balance: '',
            shot_power: '',
            jumping: '',
            stamina: '',
            strength: '',
            aggression: '',
            interceptions: '',
            positioning: '',
            vision: '',
            penalties: '',
            composure: '',
            marking: '',
            standing_tackle: '',
            sliding_tackle: ''
        });
        setPreviewImage('');
        setErrors({});
        toast.success('Player added successfully!');
    };
    
    const handleEditPlayerSubmit = (e) => {
        e.preventDefault();
    
        const validationErrors = Object.keys(editPlayer).reduce((acc, key) => {
            const error = validatePlayerInput(key, editPlayer[key], editPlayer);
            if (Object.keys(error).length > 0) {
                acc[key] = error[key];
            }
            return acc;
        }, {});
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        const updatedPlayers = players.map((player) =>
            player._id === editPlayer._id ? editPlayer : player
        );
        setPlayers(updatedPlayers);
    
        // Reset states
        setEditPlayer(null);
        setNewPlayer({
            image: '',
            full_name: '',
            birth_date: '',
            age: '',
            height_cm: '',
            weight_kgs: '',
            positions: '',
            nationality: '',
            overall_rating: '',
            potential: '',
            long_shots: '',
            dribbling: '',
            crossing: '',
            finishing: '',
            heading_accuracy: '',
            short_passing: '',
            volleys: '',
            curve: '',
            freekick_accuracy: '',
            long_passing: '',
            ball_control: '',
            acceleration: '',
            sprint_speed: '',
            agility: '',
            reactions: '',
            balance: '',
            shot_power: '',
            jumping: '',
            stamina: '',
            strength: '',
            aggression: '',
            interceptions: '',
            positioning: '',
            vision: '',
            penalties: '',
            composure: '',
            marking: '',
            standing_tackle: '',
            sliding_tackle: ''
        });
        setPreviewImage('');
        setErrors({});
        toast.success('Player updated successfully!');
    };

        const handleEditClick = (player) => {
        setEditPlayer(player);
        setNewPlayer(player);  // Populate form fields for editing
    };

    return (
        <Container>
            <ToastContainer />
            <Navbar expand="lg" className="navbar">
                <Nav className="navbar-nav">
                    <Nav.Item>

                        <NavDropdown aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigation" >
                            <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <NavDropdown.Item>
                                <Link to="addSection" smooth={true} duration={300}>
                                    <i className="lnr-inbox" /> Add Players
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="viewSection" smooth={true} duration={300}>
                                    <i className="lnr-book" /> View Players
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <div className="p-3 text-right">
                                <Button variant="link">Settings</Button>
                            </div>
                        </NavDropdown>

                    </Nav.Item>
                </Nav>
            </Navbar>


            <Container>
                <Container id="viewSection" className="box">
                    <h4>-- View Players --</h4>
                    <PlayerTable
                        players={players}
                        removePlayer={removePlayer}
                        handleEditClick={handleEditClick}
                    />
                </Container>
                <Container id="addSection" className="box">
                    <h4>{editPlayer ? '-- Edit Player --' : '-- Add Player --'}</h4>

                    <AddPlayerForm
                        key={editPlayer ? `edit-${editPlayer._id}` : `add-${JSON.stringify(newPlayer)}`}
                        player={editPlayer || newPlayer}
                        handleSubmit={editPlayer ? handleEditPlayerSubmit : handleAddPlayerSubmit}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        previewImage={previewImage}
                    />


                </Container>


            </Container>
        </Container>
    );
};

export default AdminPanel;
