import React from 'react'
import {Container, Nav, Navbar, Form, Button} from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function MyNav() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/")
    };

    const handleLogin = (e) => {
        navigate("/login")
    }

    const handleGoogleLogin = async (e) => {
        const str = `http://localhost:3001/api/meeples/googleLogin`;
        window.open(str, "_self");
        console.log("Str", str)
    }

    return (
        <Navbar 
            expand="lg"
            //bg={theme} 
            //variant={theme}
            >
            <Container>
            <Navbar.Brand href="#home"> MeepleDen </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Button 
                //variant={theme === "dark" ? "light" : "dark"}
                //onClick={handleTheme}
                className="d-flex p-2"
                >
                </Button>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#browser">Browser</Nav.Link>
                </Nav>
                <Form className="d-flex p-1" >
                    <Form.Control
                        required
                        type="text"
                        placeholder="Search a den..."
                        className=" mr-sm-2"
                    />
                </Form>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
                <Button onClick={handleLogin}>
                    Login
                </Button>
                <Button onClick={handleGoogleLogin}>
                    Login con Google
                </Button>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
