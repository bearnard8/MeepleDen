import React from 'react'
import {Container, Nav, Navbar, ListGroup} from "react-bootstrap";

export default function footer() {
  return (
    <Navbar 
    expand="lg" 
    className=" fixed-bottom"
    //data-bs-theme={theme}
    //bg={theme}
    >
        <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
                <ListGroup horizontal>
                    <ListGroup.Item className="p-0">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="p-0">
                        <Nav.Link href="#home">Link</Nav.Link>
                    </ListGroup.Item>
                </ListGroup>
            </Nav>
        </Container>
    </Navbar>
  )
}
