import { Container, Alert } from "react-bootstrap"
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import ProfileComponent from "../Auth/ProfileComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import ExpenseForm from "../Expense/ExpenseForm";
import ExpenseList from "../Expense/ExpenseList";

const Home = () => {
    const authCtx = useContext(AuthContext);

    const verifyEmail = async () => {

        const response = await axios.post("http://localhost:3000/verify-email", undefined, { headers: { "Authorization": authCtx.token } })
        if (response.status === 200) {

        }
    }

    return (
        <>
            {!authCtx.isProfileComplete && <ProfileComponent />}
            {!authCtx.isVerified &&
                <Alert variant='warning' className="d-flex justify-content-center">
                    <div>Email Verification pending</div>
                    <Alert.Link as={Link} onClick={verifyEmail} className="mx-1 p-0 btn-link-danger" >Verify Email</Alert.Link>
                </Alert>
            }
            <Container className="mt-5 justify-content-center">
                {/* <h1 className="d-flex justify-content-center mt-4">Hello Welcome to Expense Tracker</h1> */}
                <ExpenseForm />
                {/* <ExpenseList /> */}
            </Container>
        </>

    )
}

export default Home;