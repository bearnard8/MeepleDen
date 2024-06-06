import React from 'react';
import { ListGroup } from 'react-bootstrap';

const DenPlannedGames = ({ plannedGames }) => {
    return (
        <div>
            <h3>Planned Games</h3>
            <ListGroup>
                {plannedGames.map(game => (
                    <ListGroup.Item key={game._id}>
                        {game.game.name} - {new Date(game.date).toLocaleString()}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default DenPlannedGames;