import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import RemoveButton from '../utils/RemoveButton';

const MeepleWishedGames = ({ wishedGames, handleRemoveGame }) => {
    return (
        <Card>
            <Card.Header>Wished Games</Card.Header>
            <ListGroup variant="flush">
                {wishedGames.map(game => (
                    <ListGroup.Item key={game._id}>
                        {game.name}
                        <RemoveButton game={game} listType="wished" handleRemoveGame={handleRemoveGame} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default MeepleWishedGames;