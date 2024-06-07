import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import './GameSearchResults.css';

const GameSearchResults = () => {
    const { meeple, token } = useAuth();
    const [ games, setGames ] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/search?query=${query}`);
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Error fetching games: ", error);
            }
        };

        if (query) {
            fetchGames();
        }
    }, [query]);

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
             //! trasformare in banner console.log('Game added to owned games:', data);
        } catch (error) {
            console.error(`Error adding game to owned games: `, error);
        }
        navigate(`/meeple/${meeple._id}`);
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
            //! trasformare in banner console.log('Game added to wished games:', data);
        } catch (error) { 
            console.error('Error adding game to wished games:', error);
        }
        navigate(`/meeple/${meeple._id}`);
    };


    return (
        <Container>
            <h1>Search Results</h1>
            <Row>
                {games.map(game => (
                    <Col key={game._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className="game-card h-100">
                            {/*<Card.Img variant="top" src={game.cover} alt={game.name} />*/}
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{game.name}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    <strong>Description:</strong> {game.description}
                                    <br />
                                    <strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}
                                    <br />
                                    <strong>Genre:</strong> {game.genre}
                                    <br />
                                    <strong>Developer:</strong> {game.developer}
                                    <br />
                                    <strong>Platforms:</strong> {game.platform.join(', ')}
                                    <br />
                                    <strong>Rating:</strong> {game.rating}
                                    <br />
                                    <strong>Players:</strong> {game.players.min} - {game.players.max}
                                    <br />
                                    <strong>Duration:</strong> {game.duration} minutes
                                </Card.Text>
                                <div className="button-group">
                                    <Button size="sm" variant='outline-primary' className='mx-2' onClick={() => addToOwnedGames(game._id)}>Add to Owned Games</Button>
                                    <Button size="sm" variant='outline-primary' className='mx-2' onClick={() => addToWishedGames(game._id)}>Add to Wished Games</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default GameSearchResults;
