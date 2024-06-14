import React, { useEffect, useState } from "react";
import { ListGroup, Alert, Spinner, Button, Row, Container } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext"
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "./PlannedGames.css"

const PlannedGames = () => {
    const { meeple, token } = useAuth();
    const [plannedGames, setPlannedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchPlannedGames = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/plannedGames/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ meepleId: meeple._id })
                });

                if(!response.ok) {
                    throw new Error("Failed to fetch planned games");
                }
                const data = await response.json();
                
                if (data.message) {
                    setMessage(data.message);
                } else {
                    setPlannedGames(data);
                }
            } catch (error) {
                setError(error.message);
                console.error("There was an error finding planned games", error);
                toast.error("There was an error finding planned games")
            } finally {
                setLoading(false);
            }
        };

        if (meeple) {
            fetchPlannedGames();
        }
    }, [meeple, token]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">Error: {error}</Alert>;
    }

    if (message) {
        return <Alert variant="warning">{message}</Alert>;
    }

    return (
        <Container className="my-2">
            <Row> 
                <ListGroup id="game-container" className="px-0">
                    {plannedGames.map(game => (
                        <ListGroup.Item key={game._id} className="game-item">
                            <div>
                                <strong>Game:</strong> {game.game.name}<br />
                                <strong>Den:</strong> {game.den.name}<br />
                                <strong>Date:</strong> {new Date(game.date).toLocaleString()}<br />
                                <strong>Location:</strong> {game.location}
                            </div>
                            <Button 
                                variant="outline-primary" 
                                size="sm" 
                                as={Link} 
                                to={`/den/${game.den._id}`}
                            >
                                Vai al Den
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
        </Container>
    );
};

export default PlannedGames;