import React, { useEffect, useState } from "react";
import { ListGroup, Alert, Spinner, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';

const PlannedGames = () => {
    const { meeple, token } = useAuth();
    const navigate = useNavigate();
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
                console.error(`There was an error finding planned games`, error);
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
        <ListGroup>
            {plannedGames.map(game => (
                <ListGroup.Item key={game._id}>
                    <div>
                        <strong>Game:</strong> {game.game.name}
                    </div>
                    <div>
                        <strong>Den:</strong> {game.den.name}
                    </div>
                    <div>
                        <strong>Date:</strong> {new Date(game.date).toLocaleString()}
                    </div>
                    <div>
                        <strong>Location:</strong> {game.location}
                    </div>
                    <Button onClick={() => navigate('/some-path')}>Vai al Den</Button> {/* modificare il navigate in modo da mandare al den della giocata */}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default PlannedGames;