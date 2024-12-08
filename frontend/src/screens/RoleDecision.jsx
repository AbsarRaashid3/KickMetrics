import React from 'react'
import { Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const RoleDecision = () => {
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
                <Link to="/AdminPanel" >
                    <Button id="admin-Button">
                        Admin
                    </Button>
                </Link>
            </Container>
        </>


    );
}

export default RoleDecision;