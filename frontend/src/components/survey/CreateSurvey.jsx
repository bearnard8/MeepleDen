import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateSurvey = ({ denId, games, onClose }) => {
    const { token, meeple } = useAuth();
    const navigate = useNavigate();
    const [gameOptions, setGameOptions] = useState([]);
    const [dateOptions, setDateOptions] = useState([{ date: '', time: '' }]);

    const handleGameChange = (index, value) => {
        const newGameOptions = [...gameOptions];
        newGameOptions[index] = value;
        setGameOptions(newGameOptions);
    };

    const addGameOption = () => {
        setGameOptions([...gameOptions, '']);
    };

    const handleDateOptionChange = (index, field, value) => {
        const newDateOptions = [...dateOptions];
        newDateOptions[index][field] = value;
        setDateOptions(newDateOptions);
    };

    const addDateOption = () => {
        setDateOptions([...dateOptions, { date: '', time: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/api/survey/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ denId, gameOptions, dateOptions, creatorId: meeple._id })
        });

        if (response.ok) {
            toast.success('Survey created successfully');
            onClose();
            navigate(`/den/${denId}`);
        } else {
            console.log('Failed to create survey');
            toast.error('Error creating survey');
        }
    };

    return (
        <Container>
            <h3>Create Survey</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Select Games</Form.Label>
                    {gameOptions.map((game, index) => (
                        <Form.Control
                            as="select"
                            value={game}
                            onChange={(e) => handleGameChange(index, e.target.value)}
                            key={index}
                        >
                            <option value="">Select a game</option>
                            {games.map(game => (
                                <option key={game._id} value={game._id}>{game.name}</option>
                            ))}
                        </Form.Control>
                    ))}
                    <Button variant="outline-secondary" onClick={addGameOption}>Add Game Option</Button>
                </Form.Group>
                {dateOptions.map((option, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={option.date}
                                    onChange={(e) => handleDateOptionChange(index, 'date', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    step="900"
                                    value={option.time}
                                    onChange={(e) => handleDateOptionChange(index, 'time', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                ))}
                <Button size="sm" variant="outline-secondary" onClick={addDateOption}>Add Date Option</Button>
                <Button size="sm" variant="outline-primary" type="submit">Create Survey</Button>
            </Form>
        </Container>
    );
};

export default CreateSurvey;
