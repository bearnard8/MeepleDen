import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';

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
            <ListGroup>
                {games.map(game => (
                    <ListGroup.Item key={game._id}>
                        {game.name}
                        <Button size="sm" onClick={() => addToOwnedGames(game._id)}>Add to Owned Games</Button>
                        <Button size="sm" onClick={() => addToWishedGames(game._id)}>Add to Wished Games</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default GameSearchResults;
