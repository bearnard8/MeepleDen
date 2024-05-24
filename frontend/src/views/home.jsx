import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
// import LatestGames
// import PlannedGames
// import Rankings

const Home = () => {
    const userId = ""; // qui andrà l?ID dell'utente loggato, se esistente

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2> Latest Games </h2>
                    <LatestGames />
                </Col>
                <Col md={6}>
                    <h2>Upcoming Games</h2>
                    <PlannedGames userID={userID} /> {/* gestire userID */}
                    <h2>Rankings</h2>
                    <Rankings />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;