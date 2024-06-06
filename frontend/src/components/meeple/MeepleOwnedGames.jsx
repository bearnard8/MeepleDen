import React from 'react';
import { ListGroup } from 'react-bootstrap';

const MeepleOwnedGames = ({ ownedGames }) => {
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

export default MeepleOwnedGames;