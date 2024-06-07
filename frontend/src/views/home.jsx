import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import LatestGames from "../components/home/LatestGames/LatestGames.jsx";
import PlannedGames from "../components/home/PlannedGames";
import Rankings from "../components/home/Rankings";
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { meeple } = useAuth(); //! da verificare
    
    if (!meeple) {
        return null;
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2> Latest Games </h2>
                    <LatestGames />
                </Col>
                <Col md={6}>
                    <h2>Planned Games</h2>
                    <PlannedGames />
                    <h2>Rankings</h2>
                    <Rankings />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;