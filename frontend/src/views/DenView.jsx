import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DenMembers from '../components/den/DenMembers.jsx';
import DenPlannedGames from '../components/den/DenPlannedGames.jsx';
//import DenOwnedGames from '../components/den/OwnedGames.jsx';
import { Container, Row, Col } from 'react-bootstrap';

const DenView = () => {
    const { denId } = useParams();
    const [den, setDen] = useState(null);

    useEffect(() => {
        const fetchDen = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/dens/${denId}`);
                const data = await response.json();
                setDen(data);
            } catch (error) {
                console.error("Error fetching den data: ", error);
            }
        };

        fetchDen();
    }, [denId]);

    if (!den) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Den Details</h1>
            <Row>
                <Col md={4}>
                    <DenMembers members={den.members} />
                </Col>
                <Col md={4}>
                    <DenPlannedGames plannedGames={den.plannedGames} />
                </Col>
            </Row>
        </Container>
    );
};

export default DenView;
