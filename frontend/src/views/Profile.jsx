import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../context/AuthContext.jsx";
import MeeplePersonalInfo from '../components/meeple/MeeplePersonalInfo';
import PlannedGames from '../components/home/PlannedGames';
import MeepleOwnedGames from '../components/meeple/MeepleOwnedGames';

const Profile = () => {
    const { meeple, updateMeeple } = useAuth();
    const [ profileData, setProfileData ] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/meeples/${meeple._id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        
        if (meeple._id) {
            fetchProfileData();
        }
    }, [meeple._id]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Profile</h1>
            <Row>
                <Col md={4}>
                    <MeeplePersonalInfo meeple={profileData} updateMeeple={updateMeeple} />
                </Col>
                <Col md={4}>
                    <PlannedGames plannedGames={profileData.plannedGames} />
                </Col>
                <Col md={4}>
                    <MeepleOwnedGames ownedGames={profileData.ownedGames} />
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;