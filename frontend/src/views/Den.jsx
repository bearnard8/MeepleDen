import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DenMembers from '../components/den/DenMembers.jsx';
import DenPlannedGames from '../components/den/DenPlannedGames.jsx';
import DenOwnedGames from '../components/den/DenOwnedGames.jsx';
import SurveyList from '../components/survey/SurveyList.jsx';
import CreateSurvey from '../components/survey/CreateSurvey.jsx';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Den = () => {
    const { denId } = useParams();
    const { token } = useAuth();
    const [den, setDen] = useState(null);
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchDen = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/dens/${denId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setDen(data);
                setGames(data.ownedGames); // Assume che i giochi posseduti siano disponibili
            } catch (error) {
                console.error("Error fetching den data: ", error);
            }
        };

        fetchDen();
    }, [denId, token]);

    if (!den) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Den Details</h1>
            <Row>
                <Col md={4}>
                    <DenMembers members={den.members} />
                </Col>
                <Col md={4}>
                    <DenPlannedGames plannedGames={den.plannedGames} />
                </Col>
                <Col md={4}>
                    <DenOwnedGames ownedGames={den.ownedGames} />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button variant="outline-primary" size="sm" onClick={() => setShowSurveyModal(true)}>Create Survey</Button>
                    <SurveyList denId={denId}/>
                </Col>
            </Row>
            <Modal show={showSurveyModal} onHide={() => setShowSurveyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Survey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateSurvey denId={denId} games={games} onClose={() => setShowSurveyModal(false)}/>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Den;
