import React from 'react';
import { ListGroup } from 'react-bootstrap';

const DenMembers = ({ members }) => {
    return (
        <div>
            <h3>Members</h3>
            <ListGroup>
                {members.map(member => (
                    <ListGroup.Item key={member._id}>{member.nickname}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default DenMembers;
