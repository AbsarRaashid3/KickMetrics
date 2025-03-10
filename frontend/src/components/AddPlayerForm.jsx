
import { Form, Button, Container } from 'react-bootstrap';
import { useRef } from 'react';

const AddPlayerForm = ({ newPlayer, handleInputChange, addPlayer, errors, previewImage }) => {
    const fileInputRef = useRef(null);

    const formFields = [
        { name: 'full_name', label: 'Full Name', type: 'text' },
        { name: 'birth_date', label: 'Birth Date', type: 'date' },
        { name: 'age', label: 'Age', type: 'number' },
        { name: 'height_cm', label: 'Height (cm)', type: 'decimal' },
        { name: 'weight_kgs', label: 'Weight (kg)', type: 'decimal' },
        { name: 'positions', label: 'Positions', type: 'text' },
        { name: 'nationality', label: 'Nationality', type: 'text' },
        { name: 'overall_rating', label: 'Overall Rating', type: 'number' },
        { name: 'potential', label: 'Potential', type: 'number' },
        { name: 'long_shots', label: 'Long Shots', type: 'number' },
        { name: 'crossing', label: 'Crossing', type: 'number' },
        { name: 'finishing', label: 'Finishing', type: 'number' },
        { name: 'heading_accuracy', label: 'Heading Accuracy', type: 'number' },
        { name: 'short_passing', label: 'Short Passing', type: 'number' },
        { name: 'volleys', label: 'Volleys', type: 'number' },
        { name: 'dribbling', label: 'Dribbling', type: 'number' },
        { name: 'curve', label: 'Curve', type: 'number' },
        { name: 'freekick_accuracy', label: 'Freekick Accuracy', type: 'number' },
        { name: 'long_passing', label: 'Long Passing', type: 'number' },
        { name: 'ball_control', label: 'Ball Control', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'sprint_speed', label: 'Sprint Speed', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'reactions', label: 'Reactions', type: 'number' },
        { name: 'balance', label: 'Balance', type: 'number' },
        { name: 'shot_power', label: 'Shot Power', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'aggression', label: 'Aggression', type: 'number' },
        { name: 'interceptions', label: 'Interceptions', type: 'number' },
        { name: 'positioning', label: 'Positioning', type: 'number' },
        { name: 'vision', label: 'Vision', type: 'number' },
        { name: 'penalties', label: 'Penalties', type: 'number' },
        { name: 'composure', label: 'Composure', type: 'number' },
        { name: 'marking', label: 'Marking', type: 'number' },
        { name: 'standing_tackle', label: 'Standing Tackle', type: 'number' },
        { name: 'sliding_tackle', label: 'Sliding Tackle', type: 'number' },
    ];

    return (
        <Container className='box'>
            <Form onSubmit={addPlayer}>
                {/* Image upload field - kept separate due to unique handling */}
                <Form.Group>
                    <Form.Label htmlFor="image">Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleInputChange}
                        accept="image/jpeg, image/png, image/jpg"
                        ref={fileInputRef}
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

                {/* Dynamic form fields */}
                {formFields.map((field) => (
                    <Form.Group key={field.name}>
                        <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
                        <Form.Control
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            value={newPlayer[field.name] || ''}
                            onChange={handleInputChange}
                            required
                        />
                        {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                    </Form.Group>
                ))}

                <Button type="submit" className="mt-3">
                    Add Player
                </Button>

            </Form>
        </Container>
    );
};

export default AddPlayerForm;
