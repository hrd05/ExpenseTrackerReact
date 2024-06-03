import { useState } from "react";
import { Container, Card, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import CompleteProfileForm from "./CompleteProfileForm";

const ProfileComponent = (props) => {
    const [showModal, setShowModal] = useState(false);

    const clickHandler = () => {
        setShowModal(true);
    }

    const hideModal = () => setShowModal(false);

    return (
        <>

            <Alert variant='danger' className="d-flex justify-content-center">
                <div>Your Profile is Incomplete.</div>
                <Alert.Link as={Link} onClick={clickHandler} className="mx-1 p-0 btn-link-danger" > Complete Now</Alert.Link>
            </Alert>

            <Modal show={showModal} onHide={hideModal}  >
                <Modal.Header closeButton  >
                    <Modal.Title>Complete Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CompleteProfileForm onHide={hideModal} />
                </Modal.Body>
            </Modal>
        </>
    );
};


export default ProfileComponent;