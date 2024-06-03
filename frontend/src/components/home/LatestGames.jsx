import React, { useEffect, useState } from 'react';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';

const LatestGames = () => {
    const [latestGames, setLatestGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const fetchLatestGames = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/latestGames/");
                if (!response.ok) {
                    throw new Error("Failed to fetch latest games");
                }
                const data = await response.json();
                setLatestGames(data);
            } catch (error) {
                setError(error.message);
                console.error("There was an error collecting data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestGames();
    }, []);

    return(
        <ListGroup>
            {latestGames.map(game => (
                <ListGroup.Item key={game._id}>
                    <div>
                        <strong>Game:</strong> {game.name}
                    </div>
                    <div>
                        <strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default LatestGames;