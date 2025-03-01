import { Navbar, Nav, Dropdown, Button, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import React, { useState, useEffect } from 'react';
import PlayerTable from '../components/ViewPlayers';
import AddPlayerForm from '../components/AddPlayerForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import playersData from '../players'
import { validatePlayerInput } from '../FormValidation'
import EditPlayerForm from '../components/EditPlayerForm';
import { FaFutbol, FaUsers,FaInbox } from 'react-icons/fa';


const AdminPanel = () => {

    const totUsers = JSON.parse(localStorage.getItem('users')) || {};
    const totUsersCount = (Object.keys(totUsers).length) > 0 ? (Object.keys(totUsers).length) - 1 : 0;
    const [showPlayers, setShowPlayers] = useState(true);
    const [showAddPlayers, setShowAddPlayers] = useState(false);
    const [showEditPlayers, setShowEditPlayers] = useState(false);
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

    function changeMenu(type) {
        if (type === "addPlayers") {
            setShowAddPlayers(true);
            setShowPlayers(false);
            setShowEditPlayers(false);
        }
        if (type === "viewPlayers") {
            setShowAddPlayers(false);
            setShowPlayers(true);
            setShowEditPlayers(false);

        }
    };

    //remove player
    const removePlayer = (id) => {
        const updatedPlayers = players.filter((player) => player._id !== id);
        setPlayers(updatedPlayers);
        toast.success('Player removed successfully!');
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files) {
            const file = files[0];
            const fieldError = validatePlayerInput(name, file, newPlayer); // Pass the file object for validation
            setErrors((prevErrors) => ({ ...prevErrors, ...fieldError }));

            if (!fieldError.image) {  // Only update the preview if validation passes
                const reader = new FileReader();
                reader.onload = () => {
                    // Save the Base64 string of the image
                    setPreviewImage(reader.result);
                    setNewPlayer({ ...newPlayer, [name]: reader.result });  // Set the Base64 string in newPlayer state
                };
                reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
            }
        }
        else {
            const fieldError = validatePlayerInput(name, value, newPlayer);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: fieldError[name] || null, // If no error, set to null to clear previous error
            }));
            setNewPlayer({ ...newPlayer, [name]: value });
        }
    };

    const addPlayer = (e) => {
        e.preventDefault();
        // Run a final validation pass before adding
        const validationErrors = {};
        Object.keys(newPlayer).forEach((key) => {
            const error = validatePlayerInput(key, newPlayer[key], newPlayer);
            if (Object.keys(error).length > 0) {
                validationErrors[key] = error[key];
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const playerWithId = { ...newPlayer, _id: players.length + 1 };
        setPlayers([...players, playerWithId]);
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
        setPreviewImage('');
        setShowAddPlayers(false); // Hide the add player form
        toast.success('Player added successfully!'); // Add success notification
    };

    // Handle image and form input changes for editing a player
    const handleEditInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files) {
            const file = files[0];
            const fieldError = validatePlayerInput(name, file, editPlayer);
            setErrors((prevErrors) => ({ ...prevErrors, ...fieldError }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setEditPlayer({ ...editPlayer, image: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            const fieldError = validatePlayerInput(name, value, editPlayer);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: fieldError[name] || null,
            }));
            setEditPlayer({ ...editPlayer, [name]: value });
        }
    };

    // Handle form submit for editing a player
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        // Validate all fields before updating player
        Object.keys(editPlayer).forEach((key) => {
            const error = validatePlayerInput(key, editPlayer[key], editPlayer);
            if (Object.keys(error).length > 0) {
                validationErrors[key] = error[key];
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedPlayers = players.map((player) =>
            player._id === editPlayer._id ? editPlayer : player
        );
        setPlayers(updatedPlayers);
        setEditPlayer(null);
        setPreviewImage(null); // Set image preview on edit
        setShowEditPlayers(false);
        toast.success('Player updated successfully!');
    };

    const handleEditClick = (player) => {
        // Hide/Show cards 
        setShowEditPlayers(true);
        setShowAddPlayers(false);
        setShowPlayers(false);
        // ==============

        setEditPlayer(player);
        setPreviewImage(player.image); // Set image preview on edit
    };

    return (
        <Container>
            <ToastContainer />
            <Navbar expand="lg" className="navbar" >
                <Nav className="navbar-nav mx-auto">
                    <Dropdown>
                        {/* Custom Hamburger Toggler */}
                        <Dropdown.Toggle as="div" id="dropdown-basic" className="hamburgerToggleStyle custom-dropdown-toggle">
                            <span className="hamburgerLineStyle"></span>
                            <span className="hamburgerLineStyle"></span>
                            <span className="hamburgerLineStyle"></span>
                        </Dropdown.Toggle>

                        {/* Dropdown Menu */}
                        <Dropdown.Menu className="custom-dropdown-menu"  >
                            <Dropdown.Item >
                                <Link to="addSection"
                                    smooth={true}
                                    duration={300}
                                    onClick={() => changeMenu('addPlayers')}>
                                    <i className="lnr-inbox" /> Add Players
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <Link to="viewSection"
                                    smooth={true}
                                    duration={300}
                                    onClick={() => changeMenu('viewPlayers')}>
                                    <i className="lnr-book" /> View Players
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>

            <Container className='mb-5 mt-3'>
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="card" style={gradient1}>
                            <div className="card-body text-center">
                                <h3 className="card-title text-white">Total Players</h3>
                                <h2 className="text-white ">{players.length}</h2>
                                <FaFutbol fontSize={35} color='white' />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="card" style={gradient2}>
                            <div className="card-body text-center">
                                <h3 className="card-title text-white">Total Users</h3>
                                <h2 className="text-white">{totUsersCount}</h2>
                                <FaUsers fontSize={35} color='white' />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="card" style={gradient3}>
                            <div className="card-body text-center">
                                <h3 className="card-title text-white">Total Enquiries</h3>
                                <h2 className="text-white">...</h2>
                                <FaInbox fontSize={35} color='white' />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container>
                {showPlayers && (
                    <Container id="viewSection" className="box">
                        <h4>-- Players --</h4>
                        <PlayerTable
                            players={players}
                            removePlayer={removePlayer}
                            handleEditClick={handleEditClick}
                        />
                    </Container>
                )}
                {showAddPlayers && (
                    <Container id="addSection" className="box">
                        <h4>-- Add Players --</h4>
                        <AddPlayerForm
                            newPlayer={newPlayer}
                            handleInputChange={handleInputChange}
                            addPlayer={addPlayer}
                            errors={errors} // Pass the errors object as a prop
                            previewImage={previewImage}
                        />
                    </Container>
                )}

                {(showEditPlayers && editPlayer) && (
                    <Container id="editSection" className="box">
                        <h4>-- Edit Player --</h4>
                        <EditPlayerForm
                            editPlayer={editPlayer}
                            handleEditInputChange={handleEditInputChange}
                            handleEditSubmit={handleEditSubmit}
                            errors={errors} // Pass the errors object as a prop
                            previewImage={previewImage}
                        />
                    </Container>
                )}

            </Container>

        </Container>
    );
};



const gradient1 = {
    backgroundImage: "linear-gradient(230deg,rgb(231, 169, 169),rgb(56, 10, 23))"
};

const gradient2 = {
    backgroundImage: "linear-gradient(230deg,rgb(47, 10, 10),rgb(127, 138, 171))"
};
const gradient3 = {
    backgroundImage: "linear-gradient(230deg,rgb(231, 169, 169),rgb(56, 10, 23))"
};
export default AdminPanel;
