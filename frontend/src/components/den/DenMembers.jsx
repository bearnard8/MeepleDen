import React from 'react';
import { ListGroup, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const DenMembers = ({ members, ownerId, onRemoveMeeple }) => {
    const { meeple } = useAuth();
    return (
        <ListGroup>
            <h3>Den Members</h3>
            {members.map(member => (
                <ListGroup.Item key={member._id} className="d-flex justify-content-between align-items-center">
                    <div>
                        <Image src={`${member.avatar}`} roundedCircle width="30" height="30" className="me-3" />
                        {member.nickname} {member._id.toString() === ownerId.toString() && <span className="text-muted">Owner</span>}
                    </div>
                    <div>
                        {(meeple._id.toString() === ownerId.toString() || meeple._id.toString() === member._id.toString()) && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onRemoveMeeple(member._id)}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default DenMembers;
