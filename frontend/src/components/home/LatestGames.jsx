import React, { useEffect, useState } from 'react';
import { ListGroup, Image } from 'react-bootstrap';

const LatestGames = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect (() => {
        const fetchLatestGames = async () => {
            try {
                const response = await fetch("endpoint"); //! definire la rotta
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                setError(error.message);
                console.error("There was an error collecting data", error);
            }
        };

        fetchLatestGames();
    }, []);

    return(
        <div>
            {error && <p>Error: {error}</p>}
            <ListGroup>
                {games.map(game => (
                    <ListGroup.Item key={game.id} action href={`/games/${game.id}`}>
                        <Image src={game.cover} thumbnail className="me-2" /> {game.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default LatestGames;