import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const SurveyResponse = () => {
    const { surveyId } = useParams();
    const { token, meeple } = useAuth();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedDateOption, setSelectedDateOption] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/survey/${surveyId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setSurvey(data);
            } catch (error) {
                console.error('Error fetching survey:', error);
            }
        };

        fetchSurvey();
    }, [surveyId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/survey/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ surveyId, selectedGame, selectedDateOption, responderId: meeple._id })
            });

            if (response.ok) {
                setMessage('Survey response submitted successfully');
                navigate(`/den/${survey.den}`);
            } else {
                setMessage('Failed to submit survey response');
            }
        } catch (error) {
            console.error('Error submitting survey response:', error);
        }
    };

    if (!survey) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <h3>Respond to Survey</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Game</Form.Label>
                    {survey.gameOptions.map((game, index) => (
                        <Form.Check
                            key={index}
                            type="radio"
                            label={game.name}
                            name="games"
                            id={`game-${index}`}
                            value={game._id}
                            onChange={(e) => setSelectedGame(e.target.value)}
                        />
                    ))}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date Options</Form.Label>
                    {survey.dateOptions.map((option, index) => (
                        <Form.Check
                            key={index}
                            type="radio"
                            label={`${new Date(option.date).toLocaleDateString()} at ${option.time}`}
                            name="dateOptions"
                            id={`dateOption-${index}`}
                            value={index}
                            onChange={(e) => setSelectedDateOption(e.target.value)}
                        />
                    ))}
                </Form.Group>
                <Button size="sm" variant="outline-primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default SurveyResponse;
