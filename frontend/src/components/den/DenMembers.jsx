import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const DenMembers = ({ members, onRemoveMeeple }) => {
    const { meeple } = useAuth();

    return (
        <ListGroup>
            {members.map(member => (
                <ListGroup.Item key={member._id}>
                    {member.nickname}
                    {meeple._id === member._id ? null : ( // Nascondi il pulsante di rimozione per l'utente corrente
                        <Button
                            variant="danger"
                            size="sm"
                            className="float-end"
                            onClick={() => onRemoveMeeple(member._id)}
                        >
                            Remove
                        </Button>
                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default DenMembers;
