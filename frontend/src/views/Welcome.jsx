import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo2.jpg";

const Welcome = () => {
    const { meeple, handleGoogleLogin } = useAuth();
    const navigate = useNavigate();

    if (meeple && meeple._id) {
        navigate('/home');
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <Container className="text-center mt-5">
            <img src={logo} alt="MeepleDen logo" width="150" height="110" />
            <h1>Welcome to MeepleDen</h1>
            <p>Please log in or sign up to continue</p>
            <Button variant="outline-primary" size="sm" onClick={handleLogin} className="m-2">Login</Button>
            <Button variant="outline-secondary" size="sm" onClick={handleSignup} className="m-2">Sign Up</Button>
            <Button variant="outline-info" size="sm" onClick={handleGoogleLogin} className="m-2">Login with Google</Button>

            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2>About MeepleDen</h2>
                        <p>
                            Welcome to MeepleDen! MeepleDen is a community-driven platform designed for board game enthusiasts. Our platform allows users to plan, organize, and track their board game sessions within their groups, known as "dens".
                        </p>
                        <h4>Features:</h4>
                        <ul>
                            <li><strong>Planned Games:</strong> Schedule and track upcoming game sessions with your friends.</li>
                            <li><strong>Owned Games:</strong> Keep a record of all the games you own.</li>
                            <li><strong>Wishlist:</strong> Maintain a wishlist of games you would like to own in the future.</li>
                            <li><strong>Den Management:</strong> Create and manage your dens, add members, and keep track of all the activities.</li>
                            <li><strong>Profile:</strong> Customize your profile and view your game history and stats.</li>
                        </ul>
                        <p>
                            MeepleDen is the ultimate companion for board game lovers, providing a centralized hub for organizing and enhancing your gaming experience. Join today and start making the most out of your game nights!
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Welcome;
