import React from 'react';
import { Container, Nav, Navbar, ListGroup } from "react-bootstrap";
import './MyFooter.css'; // Importa il file CSS personalizzato

const MyFooter = () => {
  return (
    <Navbar expand="lg" className="footer">
      <Container>
        <Navbar.Brand href="#home">MeepleDen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <ListGroup horizontal>
            <ListGroup.Item className="p-0">
              <Nav.Link href="#home">Home</Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item className="p-0">
              <Nav.Link href="#link">Link</Nav.Link>
            </ListGroup.Item>
          </ListGroup>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyFooter;
