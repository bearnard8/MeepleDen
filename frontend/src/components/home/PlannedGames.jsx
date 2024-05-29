import React, { useEffect, useState } from "react";
import { ListGroup, Image } from "react-bootstrap";

const PlannedGames = ({meepleID}) => {
    const [plannedGames, setPlannedGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlannedGames = async () => {
            try {
                const response = await fetch ("endpoint"); //! definire la rotta
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPlannedGames(data);
            } catch (error) {
                setError(error.message);
                console.error(`There was an error finding planned games`, error);
            }
        };

        fetchPlannedGames();
    }, [meepleID]);

    return (
        <div>
            {error && <p> Error: {error} </p>}
            <ListGroup>
                { plannedGames.map(game => (
                    <ListGroup.Item key={game.id}>
                        <Image src={game.denLogo} thumbnail className="me-2" />
                        <div>
                            <strong> { game.denName } </strong> - {game.date} {game.time}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup> 
        </div>
    );
};

export default PlannedGames;