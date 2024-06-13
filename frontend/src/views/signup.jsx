import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Container} from 'react-bootstrap';
import AvatarUpload from '../components/utils/AvatarUpload';

const Signup = () => {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signup form: ", { name, surname, nickname, email, password, avatar: avatarUrl })
        await signup({ name, surname, nickname, email, password, avatar: avatarUrl });
        navigate(`/home`);
    };

    return (
        <Container>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required />
                </Form.Group>

                <Form.Group controlId="formSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter surname" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                        required />
                </Form.Group>

                <Form.Group controlId="formNickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter nickname" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                        required />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required />
                </Form.Group>

                <AvatarUpload setAvatarUrl={setAvatarUrl} />

                <Button variant="primary" type="submit" className="mt-3">
                    Signup
                </Button>
            </Form>
        </Container>
    );
};

export default Signup;
