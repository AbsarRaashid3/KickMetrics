import React, { useState, useEffect } from 'react';
import { Form, Button, Container,Row, Col} from 'react-bootstrap';
import { useRef } from 'react';

const EditPlayerForm = ({ editPlayer, handleEditInputChange, handleEditSubmit, errors, previewImage }) => {
    const fileInputRef = useRef(null);

    const formFields = [
        { name: 'full_name', label: 'Full Name', type: 'text' },
        { name: 'image', label: 'Image', type: 'file', accept: 'image/jpeg, image/png, image/jpg', ref: fileInputRef },
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
        { name: 'sliding_tackle', label: 'Sliding Tackle', type: 'number' }
    ];

    return (
        <Container className='box' style={{
            maxWidth: '1000px',
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            margin: '20px auto',
            border: '2px solid #5088AD'
        }}>
            <h2 style={{ textAlign: 'center', color: '#2C3E50', marginBottom: '20px' }}>Edit Player</h2>
            <Form onSubmit={handleEditSubmit}>
                {previewImage && (
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                padding: "5px"
                            }}
                        />
                    </div>
                )}
                
                <Row>
                    {formFields.map((field, index) => (
                        <Col md={4} key={field.name} style={{ marginBottom: '12px' }}>
                            <Form.Group>
                                <Form.Label htmlFor={field.name} style={{ fontWeight: 'bold', color: '#2C3E50' }}>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    value={field.type === 'file' ? undefined : editPlayer[field.name] || ''}
                                    onChange={handleEditInputChange}
                                    required={field.type !== 'file'}
                                    accept={field.accept}
                                    ref={field.ref}
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid #5088AD',
                                        padding: '8px',
                                        fontSize: '14px'
                                    }}
                                />
                                {errors[field.name] && <div className="text-danger" style={{ fontSize: '13px', marginTop: '5px' }}>{errors[field.name]}</div>}
                            </Form.Group>
                        </Col>
                    ))}
                </Row>

                <Button type="submit" className="mt-3" style={{
                    backgroundColor: '#5088AD',
                    border: 'none',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#3B6D93'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#5088AD'}>
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
};

export default EditPlayerForm;
