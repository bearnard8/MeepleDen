import React from 'react';
import { ListGroup } from 'react-bootstrap';
import RemoveButton from '../utils/RemoveButton';

const MeepleWishedGames = ({ wishedGames, handleRemoveGame }) => {
    return (
        <ListGroup>
            <h3 className='mt-4'>Wished Games</h3>
            {wishedGames.map(game => (
                <ListGroup.Item key={game._id} className="d-flex justify-content-between align-items-center">
                    {game.name}
                    <RemoveButton game={game} listType="wished" handleRemoveGame={handleRemoveGame} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default MeepleWishedGames;