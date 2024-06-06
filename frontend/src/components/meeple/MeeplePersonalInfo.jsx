import React, { useState } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext.jsx";

const MeeplePersonalInfo = () => {
    const { meeple, updateMeeple } = useAuth();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedMeeple, setEditedMeeple ] = useState({...meeple});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMeeple({ ...editedMeeple, [name]:value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdateMeeple = async () => {
        await updateMeeple(editedMeeple);
        setIsEditing(false);
    };

    return (
        <div>
            <h3>Personal Information</h3>
            {isEditing ? (
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedMeeple.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSurname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={editedMeeple.surname}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNickname">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            type="text"
                            name="nickname"
                            value={editedMeeple.nickname}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editedMeeple.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="outline-primary" size="sm" onClick={handleUpdateMeeple}>
                        Conferma
                    </Button>
                </Form>
            ) : (
                <ListGroup>
                    <ListGroup.Item><strong>Name:</strong> {meeple.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Surname:</strong> {meeple.surname}</ListGroup.Item>
                    <ListGroup.Item><strong>Nickname:</strong> {meeple.nickname}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {meeple.email}</ListGroup.Item>
                </ListGroup>
            )}
            <Button variant="outline-secondary" size="sm" onClick={handleEditToggle} className="mt-3">
                {isEditing ? 'Annulla' : 'Modifica'}
            </Button>
        </div>
    );
};

export default MeeplePersonalInfo;