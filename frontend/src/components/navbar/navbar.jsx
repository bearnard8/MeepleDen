import React from 'react'
import {Container, Nav, Navbar, Form, Button} from "react-bootstrap";
import { CiLight } from "react-icons/ci";

export default function navbar() {
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
                <CiLight />
            </Button>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                <Nav.Link href="#link">Browser</Nav.Link>
            </Nav>
            <Form
            className="d-flex p-1"
            >
                <Form.Control
                    required
                    type="text"
                    placeholder="Search a den..."
                    className=" mr-sm-2"
                    value = {searchValue}
                    onChange = {(e) => updateSearchValue(e)}
                />
            </Form>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
