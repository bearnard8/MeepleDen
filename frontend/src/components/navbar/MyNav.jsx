import React, { useEffect, useState } from 'react'
import {Container, Nav, Navbar, NavDropdown, Form, Button} from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa6";
import logo from "../../assets/logo2.jpg";

export default function MyNav() {

    const { meeple, logout, googleLogin } = useAuth();
    const [ searchQuery, setSearchQuery ] = useState("");
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/")
    };

    useEffect(() => {
        googleLogin();
    })

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    }

    return (
        <Navbar expand="lg" className='d-flex align-items-center'>
            <Container>
                <Navbar.Brand href={meeple._id ? "/home" : "/"} className='d-flex align-items-center'> 
                    <img
                        src={logo}
                        width="40"
                        height="33"
                        className="d-inline-block align-top"
                        alt="MeepleDen logo"
                    />
                    MeepleDen
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <NavDropdown title="Dens" id="basic-nav-dropdown">
                            {meeple && meeple.dens.map(den => (
                                <NavDropdown.Item key={den._id} href={`/den/${den._id}`}>
                                    {den.name}
                                </NavDropdown.Item>
                            ))}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/create-den">Create New Den</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href={`/meeple/${meeple._id}`}>Profile</Nav.Link>
                    </Nav>
                    <Form className="d-flex p-1" onSubmit={handleSearchSubmit} >
                        <Form.Control
                            required
                            className=" mr-sm-2"
                            type="text"
                            placeholder="Search a game..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button type='submit' size="sm" variant='outline-info'> Search </Button>
                    </Form>
                    <Button onClick={handleLogout} variant='outline-danger'>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
