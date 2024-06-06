import React, { useEffect } from 'react'
import {Container, Nav, Navbar, NavDropdown, Form, Button} from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function MyNav() {

    const { meeple, logout, googleLogin } = useAuth();
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
    }

    useEffect(() => {
        googleLogin();
    })

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/"> MeepleDen </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <NavDropdown title="Dens" id="basic-nav-dropdown">
                            {meeple && meeple.dens && meeple.dens.map(den => (
                                <NavDropdown.Item key={den._id} href={`/den/${den._id}`}>
                                    {den.name}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link href={`/meeple/${meeple._id}`}>Profile</Nav.Link>
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
