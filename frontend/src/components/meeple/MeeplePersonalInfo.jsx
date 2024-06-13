import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import AvatarUpload from '../utils/AvatarUpload';
import { useAuth } from "../../context/AuthContext"

const MeeplePersonalInfo = ({ meeple, updateMeeple }) => {
    //const { meeple } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(meeple?.name || '');
    const [surname, setSurname] = useState(meeple?.surname || '');
    const [nickname, setNickname] = useState(meeple?.nickname || '');
    const [email, setEmail] = useState(meeple?.email || '');
    const [avatarUrl, setAvatarUrl] = useState(meeple?.avatar || '');

    const handleSave = async () => {
        try {
            await updateMeeple({ _id: meeple._id, name, surname, nickname, email, avatar: avatarUrl });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving personal info:", error);
        }
    };

    return (
        <div>
            <h3>Personal Information</h3>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                </Form.Group>
                <Form.Group controlId="formSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" value={surname} onChange={(e) => setSurname(e.target.value)} disabled={!isEditing} />
                </Form.Group>
                <Form.Group controlId="formNickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} disabled={!isEditing} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
                </Form.Group>
                <Form.Group controlId="formAvatar">
                    <Form.Label>Avatar</Form.Label>
                    <div className="mb-3">
                        <Image src={avatarUrl} roundedCircle width="100" height="100" />
                    </div>
                    {isEditing && <AvatarUpload setAvatarUrl={setAvatarUrl} />}
                </Form.Group>
                {isEditing ? (
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                ) : (
                    <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
            </Form>
        </div>
    );
};

export default MeeplePersonalInfo;
