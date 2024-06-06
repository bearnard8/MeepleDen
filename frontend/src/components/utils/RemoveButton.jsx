import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RemoveButton = ({ game, listType, handleRemoveGame }) => {
    const [ showModal, setShowModal ] = useState(false);
    const navigate = useNavigate();
    const { meeple } = useAuth();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmRemove = () => {
        handleRemoveGame(game._id, listType);
        handleCloseModal();
        navigate(`/meeple/${meeple._id}`);
    };

    return (
        <>
            <Button variant="outline-danger" size="sm" onClick={handleShowModal} className="mx-2" > Remove </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title> Confirm Remove </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this game from your {listType}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={handleCloseModal}> Cancel </Button>
                    <Button variant="outline-danger" size="sm" onClick={handleConfirmRemove}> Confirm </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default RemoveButton;