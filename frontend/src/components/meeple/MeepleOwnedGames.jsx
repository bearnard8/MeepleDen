import React from 'react';
import { ListGroup } from 'react-bootstrap';
import RemoveButton from '../utils/RemoveButton';

const MeepleOwnedGames = ({ ownedGames, handleRemoveGame }) => {
    return (
        <ListGroup>
            <h3>Owned Games</h3>
            {ownedGames.map(game => (
                <ListGroup.Item key={game._id} className="d-flex justify-content-between align-items-center">
                    {game.name}
                    <RemoveButton game={game} listType="owned" handleRemoveGame={handleRemoveGame} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default MeepleOwnedGames;