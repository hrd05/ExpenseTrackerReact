import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { useState, useContext } from "react";
import classes from "./AuthForm.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
import Loader from "../Loader";


const AuthForm = () => {
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();


    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const body = {
            email: email,
            password: password
        }
        if (login) {
            try {
                const response = await axios.post("http://localhost:3000/login", body);
                console.log(response);
                if (response.status === 200) {
                    // const { fullName, photoUrl } = response.data.user;
                    // console.log(fullName, photoUrl);
                    if (response.data.user.fullName && response.data.user.photoUrl) {
                        authCtx.completeProfile();
                    }
                    if (response.data.user.verified) {
                        authCtx.verify();
                    }
                    authCtx.login(response.data.token);
                    // alert('Login successfull');
                    navigate('/home');
                }
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        }
        else {
            try {
                if (password === confirmPass) {
                    const response = await axios.post("http://localhost:3000/signup", body);
                    console.log(response);
                    alert(response.data);
                    setPassword('');
                    setEmail('');
                    setConfirmPass('');
                    setLogin(true);
                }
                else {
                    alert("Password doesnt match");
                }
            }
            catch (err) {
                alert(err.response.data.message);
            }
        }
        setIsLoading(false);
    }



    const emailChangeHandler = (event) => setEmail(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);
    const confirmPassChangeHandler = (event) => {
        setConfirmPass(event.target.value);
    }




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
                                required
                            ></Form.Control>
                        </FormGroup>}
                        {!isLoading ? <Button type="submit">{login ? 'Login' : 'Signup'}</Button> :
                            <Loader />
                        }

                    </Form>
                    {login && <Link className="d-flex justify-content-center mt-3 " to="/forgot-password">forgot password</Link>}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center bg-white">
                    <button onClick={() => setLogin((prevState) => !prevState)} className={classes.btn}>{login ? 'Create New Account' : 'Have an account? Login'}</button>
                </Card.Footer>

            </Card>
        </Container>
    )
}

export default AuthForm;