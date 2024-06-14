import React from 'react';
import { ListGroup } from 'react-bootstrap';

const DenPlannedGames = ({ plannedGames }) => {
    if (!plannedGames || plannedGames.length === 0) {
        return <div>
                    <h3>PlannedGames</h3> 
                    <p>No planned games.</p>
                </div>
    }

    return (
        <div>
            <h3>Planned Games</h3>
            <ListGroup>
            {plannedGames.map((game) => (
                <ListGroup.Item key={game._id}>
                    <div>
                        <strong>Game:</strong> {game.game?.name || 'Unknown Game'}
                    </div>
                    <div>
                        <strong>Date:</strong> {new Date(game.date).toLocaleString()}
                    </div>
                    <div>
                        <strong>Location:</strong> {game.location || 'Unknown Location'}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
        </div>
    );
};

export default DenPlannedGames;