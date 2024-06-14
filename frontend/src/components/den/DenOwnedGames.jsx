import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const DenOwnedGames = ({ members, setGames }) => {
    const { token } = useAuth();
    const [ownedGames, setOwnedGames] = useState([]);

    useEffect(() => {
        const fetchOwnedGames = async () => {
            const gamesSet = new Set();

            for (const member of members) {
                try {
                    const response = await fetch(`http://localhost:3001/api/meeples/${member._id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();

                    data.ownedGames.forEach(game => gamesSet.add(JSON.stringify(game)));
                } catch (error) {
                    console.error(`Error fetching owned games for member ${member._id}:`, error);
                }
            }

            // Convert the Set back to an array of objects
            const uniqueGames = Array.from(gamesSet).map(game => JSON.parse(game));
            setOwnedGames(uniqueGames);
            setGames(uniqueGames); // Pass unique games to the parent component
        };

        fetchOwnedGames();
    }, [members, token, setGames]);

    return (
        <div>
            <h3>Owned Games</h3>
            <ListGroup>
                {ownedGames.map(game => (
                    <ListGroup.Item key={game._id}>{game.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default DenOwnedGames;
