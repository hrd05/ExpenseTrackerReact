import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [classPass, setClassPass] = useState('');

    useEffect(() => {
        if (!login) {
            if (password && confirmPass) {
                if (password !== confirmPass) {
                    setClassPass(classes.wrong);
                } else {
                    setClassPass(classes.right);
                }
            } else {
                setClassPass(''); // Reset class when inputs are empty
            }
        }
    }, [password, confirmPass, login]);

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(email, password, confirmPass);
    }



    const emailChangeHandler = (event) => setEmail(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);
    const confirmPassChangeHandler = (event) => setConfirmPass(event.target.value);




    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className={classes.card}>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center">{login ? 'Login' : 'Signup'}</Card.Title>
                    <Form className={classes.form} onSubmit={submitHandler}>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={emailChangeHandler}
                                required
                            ></Form.Control>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={passwordChangeHandler}
                                required
                            ></Form.Control>
                        </FormGroup>
                        {!login && <FormGroup className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPass}
                                onChange={confirmPassChangeHandler}
                                className={classPass}
                                required
                            ></Form.Control>
                        </FormGroup>}

                        <Button type="submit">{login ? 'Login' : 'Signup'}</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center bg-white">
                    <button onClick={() => setLogin((prevState) => !prevState)} className={classes.btn}>{login ? 'Create New Account' : 'Have an account? Login'}</button>
                </Card.Footer>

            </Card>
        </Container>
    )
}

export default AuthForm;