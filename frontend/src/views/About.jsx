import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
    return (
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
    );
};

export default About;
