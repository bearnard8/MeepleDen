import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Container className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="m-5 px-5 w-75 d-flex justify-content-center">
                <Form.Group className="mx-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mx-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="outline-primary" size="sm" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Login;