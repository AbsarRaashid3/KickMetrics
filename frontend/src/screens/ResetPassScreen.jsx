import { useState } from 'react'; // to manage state
import { Row, Col, Form, Button, FormGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // react-router component for navigation without reloading the site
import './../assets/styles/authScreen.css';
import { validateEmail, validatePassword } from "../FormValidation";

const ResetPassScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault(); // Prevent form refresh
        const emailError = validateEmail(email); if (emailError) { setError(emailError); return; }
        const passwordError = validatePassword(password); if (passwordError) { setError(passwordError); return; }
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[email]) { setError("No account found with this email."); return; }

        setError('');
        setTimeout(() => {      // Use a timeout to ensure the state is updated before triggering the alert
            users[email].password = password; // Update the password for the user
            localStorage.setItem('users', JSON.stringify(users)); // Save the updated users object
            alert("Password Reset successfully!");
            setEmail('');
            setPassword('');
        }, 0);
    };
    return (
        <Container className='authForm-container form' >
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2 className="title">Reset Password</h2>
                <Form onSubmit={submitHandler} >
                    <FormGroup controlId="email" className="mb-3 mt-3">
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email} // links the input value to email state
                            onChange={(e) => setEmail(e.target.value)} // Updates the email state whenever the user types
                        />
                    </FormGroup>
                    <FormGroup controlId="password" className="mb-3 mt-3">
                        <Form.Control
                            type="password"
                            placeholder="Enter New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <Button type="submit" className="button ">
                        Reset
                    </Button>
                    {error && <p className="error">{error}</p>}
                </Form>
                
                <Row className="py-3">
                    <Col className="text-center">
                        <Link to="/signIn" className='anchor'>Back to SignIn?</Link>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ResetPassScreen;
