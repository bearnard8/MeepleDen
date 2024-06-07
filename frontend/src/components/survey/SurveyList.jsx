import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from "react-toastify";

const SurveyList = ({ denId }) => {
    const { token } = useAuth();
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/survey?denId=${denId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setSurveys(data);
            } catch (error) {
                console.error('Error fetching surveys:', error);
                toast.error('Error fetching surveys');
            }
        };

        fetchSurveys();
    }, [denId, token]);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Pending Surveys</h3>
                    <ListGroup>
                        {surveys.map(survey => (
                            <ListGroup.Item key={survey._id}>
                                <div>
                                    <strong>Game Options:</strong>
                                    <ul>
                                        {survey.gameOptions.map((game, index) => (
                                            <li key={index}>{game.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <strong>Date Options:</strong>
                                    <ul>
                                        {survey.dateOptions.map((option, index) => (
                                            <li key={index}>
                                                {new Date(option.date).toLocaleDateString()} at {option.time}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button size="sm" variant="outline-primary" as={Link} to={`/survey/${survey._id}`}>
                                    Respond to Survey
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default SurveyList;
