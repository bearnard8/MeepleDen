import React from 'react';
import { ListGroup } from 'react-bootstrap';
import RemoveButton from '../utils/RemoveButton';

const MeepleOwnedGames = ({ ownedGames, handleRemoveGame }) => {
    return (
        <div>
            <h3>Owned Games</h3>
            <ListGroup>
                {ownedGames.map(game => (
                    <ListGroup.Item key={game._id}>
                        {game.name}
                        <RemoveButton game={game} listType="owned" handleRemoveGame={handleRemoveGame} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MeepleOwnedGames;