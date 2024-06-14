import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import { toast } from "react-toastify";
import './LatestGames.css';

const LatestGames = () => {
    const { meeple, token } = useAuth();
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchLatestGames = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/latestGames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error fetching latest games:', error);
                toast.error("Error fetching latest games")
            }
        };

        fetchLatestGames();
    }, [token]);

    const addToOwnedGames = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/meeples/${meeple._id}/ownedGames`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ gameId })
            });
            const data = await response.json();
            toast.success("Game added to owned games")
        } catch (error) {
            console.error(`Error adding game to owned games: `, error);
            toast.error("Error adding game to owned games")
        }
    };

    const addToWishedGames = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/meeples/${meeple._id}/wishedGames`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ gameId })
            });
            const data = await response.json();
            toast.success('Game added to wished games');
        } catch (error) {
            console.error('Error adding game to wished games:', error);
            toast.error('Error adding game to wished games');
        }
    };

    return (
        <Container className='mb-5'>
            <ListGroup id='game-container'>
                {games.map(game => (
                    <ListGroup.Item key={game._id} className="game-item">
                        <Row>
                            <Col>
                                <h5>{game.name}</h5>
                                <p>
                                    {game.description}
                                    <br />
                                    <strong>Rating:</strong> {game.rating}
                                    <br />
                                    {game.players.min} - {game.players.max} players
                                    <br />
                                    <strong>Game time:</strong> {game.duration} minutes
                                </p>
                                <div className="button-group d-flex justify-content-center">
                                    <Button size="sm" variant='outline-primary' className='mx-2' onClick={() => addToOwnedGames(game._id)}>Add to Owned Games</Button>
                                    <Button size="sm" variant='outline-primary' className='mx-2' onClick={() => addToWishedGames(game._id)}>Add to Wished Games</Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default LatestGames;
