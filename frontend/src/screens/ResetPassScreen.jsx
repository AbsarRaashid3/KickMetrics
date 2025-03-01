import { useState } from 'react'; // to manage state
import { Row, Col, Form, Button, FormGroup, Container } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom'; // react-router component for navigation without reloading the site
import './../assets/styles/authScreen.css';
import {  validatePassword } from "../FormValidation";
import { useResetPasswordMutation } from '../redux/slices/usersApiSlice';

const ResetPassScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    
    const submitHandler = async(e) => {
        e.preventDefault(); // Prevent form refresh
        const passwordError = validatePassword(password); if (passwordError) { setError(passwordError); return; }
        try {
            const res = await resetPassword({ email, password }).unwrap();
            navigate('/login');
        } catch (err) {
            setError(err?.data?.message || err.error);
        }
      
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
                        <Link to="/register" className='anchor'>Back to SignIn?</Link>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ResetPassScreen;
