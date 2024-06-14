import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";

const CreateDenForm = () => {
    const { token, meeple } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/dens/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    owner: meeple._id,
                    vipStatus: false
                })
            });

            if (response.ok) {
                toast.success('Den created successfully');
                navigate('/home');
            } else {
                alert('Failed to create den');
            }
        } catch (error) {
            console.error('Error creating den:', error);
            toast.danger('Failed to create den');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Create a New Den</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formDenName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter den name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDenDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter den description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="outline-primary" size="sm" className='mt-2' type="submit">
                            Create Den
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateDenForm;
