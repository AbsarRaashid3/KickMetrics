import React,{useState,useEffect} from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useRef } from 'react';

const AddPlayerForm = ({ player, handleSubmit, errors, handleInputChange, previewImage }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState(player || {});

    useEffect(() => {
        setFormData(player);
    }, [player]);

    

    const handleFieldChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files) {
            const file = files[0];
            handleInputChange(name, file);
            const reader = new FileReader();
            reader.onload = () => setFormData({ ...formData, [name]: reader.result });
            reader.readAsDataURL(file);
        } else {
            handleInputChange(name, value);
        }
    };

    return (


        <Container className='box'>

            <Form onSubmit={(e) => handleSubmit(e, player)}>  {/*onSubmit={addPlayer}*/}
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="full_name"
                        value={player.full_name||''}  //newPlayer.full_name
                        onChange={handleFieldChange}  //handleInputChange
                        required
                    />
                    {errors.full_name && <div className="text-danger">{errors.full_name}</div>}

                    {/* {errors.full_name && (
                        <Form.Control.Feedback type="invalid">
                            {errors.full_name}
                        </Form.Control.Feedback>
                    )} */}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                       // value={newPlayer.image}
                        onChange={handleFieldChange}
                        accept="image/jpeg, image/png, image/jpg"
                        ref={fileInputRef} //to clear the file input after selecting a new image
                        required
                    />
                    {errors.image && <div className="text-danger">{errors.image}</div>}

                </Form.Group>
                {previewImage && (
                    <div>
                        <p>Image Preview:</p>
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                    </div>
                )}
                
                <Form.Group>
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="birth_date"
                        value={player.birth_date||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.birth_date && <div className="text-danger">{errors.birth_date}</div>}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={player.age||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.age && <div className="text-danger">{errors.age}</div>}

                    </Form.Group>

                <Form.Group>
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                        type="decimal"
                        name="height_cm"
                        value={player.height_cm||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.height_cm && <div className="text-danger">{errors.height_cm}</div>}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Weight (kg)</Form.Label>
                    <Form.Control
                        type="decimal"
                        name="weight_kgs"
                        value={player.weight_kgs||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.weight_kgs && <div className="text-danger">{errors.weight_kgs}</div>}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Positions</Form.Label>
                    <Form.Control
                        type="text"
                        name="positions"
                        value={player.positions||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.positions && <div className="text-danger">{errors.positions}</div>}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                        type="text"
                        name="nationality"
                        value={player.nationality||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.nationality && <div className="text-danger">{errors.nationality}</div>}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Overall Rating</Form.Label>
                    <Form.Control
                        type="number"
                        name="overall_rating"
                        value={player.overall_rating||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.overall_rating && <div className="text-danger">{errors.overall_rating}</div>}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Potential</Form.Label>
                    <Form.Control
                        type="number"
                        name="potential"
                        value={player.potential||''}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.potential && <div className="text-danger">{errors.potential}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Long Shots</Form.Label>
                    <Form.Control
                        type="number"
                        name="long_shots"
                        value={player.long_shots}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.long_shots && <div className="text-danger">{errors.long_shots}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Crossing</Form.Label>
                    <Form.Control
                        type="number"
                        name="crossing"
                        value={player.crossing}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.crossing && <div className="text-danger">{errors.crossing}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Finishing</Form.Label>
                    <Form.Control
                        type="number"
                        name="finishing"
                        value={player.finishing}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.finishing && <div className="text-danger">{errors.finishing}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Heading Accuracy</Form.Label>
                    <Form.Control
                        type="number"
                        name="heading_accuracy"
                        value={player.heading_accuracy}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.heading_accuracy && <div className="text-danger">{errors.heading_accuracy}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Short Passing</Form.Label>
                    <Form.Control
                        type="number"
                        name="short_passing"
                        value={player.short_passing}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.short_passing && <div className="text-danger">{errors.short_passing}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Volleys</Form.Label>
                    <Form.Control
                        type="number"
                        name="volleys"
                        value={player.volleys}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.volleys && <div className="text-danger">{errors.volleys}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Dribbling</Form.Label>
                    <Form.Control
                        type="number"
                        name="dribbling"
                        value={player.dribbling}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.dribbling && <div className="text-danger">{errors.dribbling}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Curve</Form.Label>
                    <Form.Control
                        type="number"
                        name="curve"
                        value={player.curve}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.curve && <div className="text-danger">{errors.curve}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Freekick Accuracy</Form.Label>
                    <Form.Control
                        type="number"
                        name="freekick_accuracy"
                        value={player.freekick_accuracy}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.freekick_accuracy && <div className="text-danger">{errors.freekick_accuracy}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Long Passing</Form.Label>
                    <Form.Control
                        type="number"
                        name="long_passing"
                        value={player.long_passing}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.long_passing && <div className="text-danger">{errors.long_passing}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Ball Control</Form.Label>
                    <Form.Control
                        type="number"
                        name="ball_control"
                        value={player.ball_control}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.ball_control && <div className="text-danger">{errors.ball_control}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Acceleration</Form.Label>
                    <Form.Control
                        type="number"
                        name="acceleration"
                        value={player.acceleration}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.acceleration && <div className="text-danger">{errors.acceleration}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Sprint Speed</Form.Label>
                    <Form.Control
                        type="number"
                        name="sprint_speed"
                        value={player.sprint_speed}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.sprint_speed && <div className="text-danger">{errors.sprint_speed}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Agility</Form.Label>
                    <Form.Control
                        type="number"
                        name="agility"
                        value={player.agility}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.agility && <div className="text-danger">{errors.agility}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Reactions</Form.Label>
                    <Form.Control
                        type="number"
                        name="reactions"
                        value={player.reactions}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.reactions && <div className="text-danger">{errors.reactions}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Balance</Form.Label>
                    <Form.Control
                        type="number"
                        name="balance"
                        value={player.balance}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.balance && <div className="text-danger">{errors.balance}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Shot Power</Form.Label>
                    <Form.Control
                        type="number"
                        name="shot_power"
                        value={player.shot_power}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.shot_power && <div className="text-danger">{errors.shot_power}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Jumping</Form.Label>
                    <Form.Control
                        type="number"
                        name="jumping"
                        value={player.jumping}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.jumping && <div className="text-danger">{errors.jumping}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Stamina</Form.Label>
                    <Form.Control
                        type="number"
                        name="stamina"
                        value={player.stamina}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.stamina && <div className="text-danger">{errors.stamina}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Strength</Form.Label>
                    <Form.Control
                        type="number"
                        name="strength"
                        value={player.strength}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.strength && <div className="text-danger">{errors.strength}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Aggression</Form.Label>
                    <Form.Control
                        type="number"
                        name="aggression"
                        value={player.aggression}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.aggression && <div className="text-danger">{errors.aggression}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Interceptions</Form.Label>
                    <Form.Control
                        type="number"
                        name="interceptions"
                        value={player.interceptions}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.interceptions && <div className="text-danger">{errors.interceptions}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Positioning</Form.Label>
                    <Form.Control
                        type="number"
                        name="positioning"
                        value={player.positioning}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.positioning && <div className="text-danger">{errors.positioning}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Vision</Form.Label>
                    <Form.Control
                        type="number"
                        name="vision"
                        value={player.vision}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.vision && <div className="text-danger">{errors.vision}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Penalties</Form.Label>
                    <Form.Control
                        type="number"
                        name="penalties"
                        value={player.penalties}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.penalties && <div className="text-danger">{errors.penalties}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Composure</Form.Label>
                    <Form.Control
                        type="number"
                        name="composure"
                        value={player.composure}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.composure && <div className="text-danger">{errors.composure}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Marking</Form.Label>
                    <Form.Control
                        type="number"
                        name="marking"
                        value={player.marking}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.marking && <div className="text-danger">{errors.marking}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Standing Tackle</Form.Label>
                    <Form.Control
                        type="number"
                        name="standing_tackle"
                        value={player.standing_tackle}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.standing_tackle && <div className="text-danger">{errors.standing_tackle}</div>}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Sliding Tackle</Form.Label>
                    <Form.Control
                        type="number"
                        name="sliding_tackle"
                        value={player.sliding_tackle}
                        onChange={handleFieldChange}
                        required
                    />
                    {errors.sliding_tackle && <div className="text-danger">{errors.sliding_tackle}</div>}

                </Form.Group>
                <Button type="submit" className="mt-3">
                {player._id  ? 'Save Changes' : 'Add Player'}
            </Button>
              
            </Form>
        </Container>
    );
};

export default AddPlayerForm;
