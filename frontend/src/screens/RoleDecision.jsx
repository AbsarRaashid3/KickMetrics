import React,{useEffect} from 'react'
import { Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const createAdmin = () => {
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const email = "admin@gmail.com";
    if (users[email]) { 
        return false; //don't create the admin if present
    }

    users[email] = {
        ...users[email],  // Preserve the previous data (in case it exists)
        email: email,
        password: "admin@123",
        username: "admin",
        authToken: "jwt-token",
        isAdmin: true
      };

    // Store the admin collection back in localStorage
    localStorage.setItem('users', JSON.stringify(users));

};

const RoleDecision = () => {

    useEffect(() => {
        // Ensure the admin is created once when the component mounts
        createAdmin();
    }, []);

    return (
        <>
            <h1>Who Are You?</h1>
            <Container>
                <Link to="/signIn" >
                    <Button id="user-Button">
                        USER
                    </Button>
                </Link>
            </Container>

            <Container>
                <Link to="/signIn" >
                    <Button id="admin-Button">
                        Admin
                    </Button>
                </Link>
            </Container>
        </>


    );
}

export default RoleDecision;