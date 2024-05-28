import React from 'react'
import {Container, Nav, Navbar, Form, Button} from "react-bootstrap";

export default function MyNav() {
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
            <Form
            className="d-flex p-1"
            >
                <Form.Control
                    required
                    type="text"
                    placeholder="Search a den..."
                    className=" mr-sm-2"
                />
            </Form>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
