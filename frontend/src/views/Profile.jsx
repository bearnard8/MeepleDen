import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../context/AuthContext.jsx";
import MeeplePersonalInfo from '../components/meeple/MeeplePersonalInfo';
import PlannedGames from '../components/home/PlannedGames';
import MeepleOwnedGames from '../components/meeple/MeepleOwnedGames';
import MeepleWishedGames from '../components/meeple/MeepleWishedGames.jsx';

const Profile = () => {
    const { meeple, updateMeeple } = useAuth();
    const { token } = useAuth();
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
                <Col md={5}>
                <h3>Planned Games</h3>
                    <PlannedGames plannedGames={profileData.plannedGames} />
                </Col>
                <Col md={3}>
                    <MeepleOwnedGames ownedGames={profileData.ownedGames} handleRemoveGame={handleRemoveGame} />
                    <MeepleWishedGames wishedGames={meeple.wishedGames} handleRemoveGame={handleRemoveGame} />
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;