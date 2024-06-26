import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../context/AuthContext.jsx";
import MeeplePersonalInfo from '../components/meeple/MeeplePersonalInfo';
import PlannedGames from '../components/home/PlannedGames/PlannedGames.jsx';
import MeepleOwnedGames from '../components/meeple/MeepleOwnedGames';
import MeepleWishedGames from '../components/meeple/MeepleWishedGames.jsx';

const Profile = () => {
    const { meeple, updateMeeple, token } = useAuth();
    const [ profileData, setProfileData ] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/meeples/${meeple._id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
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

    }, [meeple._id, token]);

    const handleRemoveGame = async (gameId, listType) => {
        try {
            const url = listType === "owned"
                ? `http://localhost:3001/api/meeples/${meeple._id}/removeOwnedGame`
                : `http://localhost:3001/api/meeples/${meeple._id}/removeWishedGame`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ gameId })
                });

                const data = await response.json();
                setProfileData(data);
        } catch (error) {
            console.error("Error while removing game from list: ", error);
        }
    }

    const handleSave = async (updatedMeeple) => {
        try {
            const response = await updateMeeple(updatedMeeple);
            setProfileData(response);
        } catch (error) {
            console.error("Error updating profile data:", error);
        }
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Profile</h1>
            <Row>
                <Col md={4}>
                    <MeeplePersonalInfo meeple={profileData} updateMeeple={handleSave} />
                </Col>
                <Col md={5}>
                <h3>Planned Games</h3>
                    <PlannedGames plannedGames={meeple.plannedGames} />
                </Col>
                <Col md={3}>
                    <MeepleOwnedGames ownedGames={meeple.ownedGames} handleRemoveGame={handleRemoveGame} />
                    <MeepleWishedGames wishedGames={meeple.wishedGames} handleRemoveGame={handleRemoveGame} />
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;