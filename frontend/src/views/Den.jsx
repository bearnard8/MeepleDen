import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DenMembers from '../components/den/DenMembers.jsx';
import DenPlannedGames from '../components/den/DenPlannedGames.jsx';
import DenOwnedGames from '../components/den/DenOwnedGames.jsx';
import SurveyList from '../components/survey/SurveyList.jsx';
import CreateSurvey from '../components/survey/CreateSurvey.jsx';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Den = () => {
    const navigate = useNavigate();
    const { denId } = useParams();
    const { token } = useAuth();
    const [den, setDen] = useState(null);
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [games, setGames] = useState([]);
    const [nickname, setNickname] = useState('');

    const fetchDen = async () => {
        try {
            if (!denId) {
                console.error("Den id is undefined");
                return;
            }

            const response = await fetch(`http://localhost:3001/api/dens/${denId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setDen(data);
        } catch (error) {
            console.error("Error fetching den data: ", error);
        }
    };

    useEffect(() => {
        fetchDen();
    }, [denId, token]);

    const handleAddMeeple = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/dens/${denId}/addMeeple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nickname })
            });

            if (response.ok) {
                await fetchDen(); // Refetch the den data after adding a member
                setNickname('');
            } else {
                alert('Failed to add meeple');
            }
        } catch (error) {
            console.error('Error adding meeple:', error);
            alert('Failed to add meeple');
        }
    };

    const handleRemoveMeeple = async (meepleId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/dens/${denId}/removeMeeple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ meepleId })
            });

            if (response.ok) {
                await fetchDen(); // Refetch the den data after removing a member
            } else {
                alert('Failed to remove meeple');
            }
        } catch (error) {
            console.error('Error removing meeple:', error);
            alert('Failed to remove meeple');
        }
    };

    const handleSurveyCreated = () => {
        fetchDen();
        navigate(`/den/${denId}`);
    };

    const handleCloseSurveyModal = () => {
        setShowSurveyModal(false);
        navigate(`/den/${denId}`);
        console.log("Ho navigato ai den");
    };

    if (!den) {
        return <div>Loading...</div>;
    }

    const owner = den.members.find((member) => member._id === den.owner);

    return (
        <Container>
            <h2>{den.name}</h2>
            <h6>The owner of this den is: {owner ? owner.nickname : 'Unknown'}</h6>
            <Row>
                <Col md={4}>
                    <DenMembers members={den.members} ownerId={den.owner} onRemoveMeeple={handleRemoveMeeple} />
                </Col>
                <Col md={4}>
                    <DenPlannedGames plannedGames={den.plannedGames} />
                </Col>
                <Col md={4}>
                    <DenOwnedGames members={den.members} setGames={setGames} />
                </Col>
            </Row>
            <Row>
                <Col md={12} className='my-2'>
                    <Form onSubmit={handleAddMeeple}>
                        <Form.Group controlId="formMeepleNickname">
                            <Form.Label><strong>Add Meeple</strong> by Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter meeple nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="outline-primary" size="sm" type="submit" className="my-2">
                            Add Meeple
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <SurveyList denId={denId} />
                    <Button variant="outline-primary" size="sm" className='my-2' onClick={() => setShowSurveyModal(true)}>Create Survey</Button>
                </Col>
            </Row>
            <Modal show={showSurveyModal} onHide={() => setShowSurveyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Survey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateSurvey denId={denId} games={games} onClose={handleCloseSurveyModal} onSurveyCreated={handleSurveyCreated} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Den;
