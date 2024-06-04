import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Loader from "../Loader";
import classes from "./ForgotPassForm.module.css";
import axios from "axios";

const ForgotPassForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('click');
        setIsLoading(true);
        console.log(email);
        try {
            const response = await axios.post("http://localhost:3000/password/forgotpassword", { email });
            if (response.status === 200) {
                console.log(response);
                setIsLoading(false);
                alert("Mail sent to your registered mail");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-content-center">
            <Card className={classes.card}>
                <Card.Title className="d-flex justify-content-center">Reset Your Password</Card.Title>
                <Card.Body>
                    <Form onSubmit={submitHandler} >
                        <Form.Group className="mb-3">
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered Email" />
                        </Form.Group>

                        {!isLoading ? <Button variant="primary" type="submit" className="w-100">Send Request</Button> :
                            <div className="d-flex justify-content-center">
                                <Loader />
                            </div>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ForgotPassForm;