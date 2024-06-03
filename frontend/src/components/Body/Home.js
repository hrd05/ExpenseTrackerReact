import { Container } from "react-bootstrap"
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import ProfileComponent from "../Auth/ProfileComponent";

const Home = () => {
    const authCtx = useContext(AuthContext);

    return (
        <>
            {!authCtx.isProfileComplete && <ProfileComponent />}
            <Container >
                <h1>Hello Welcome to Expense Tracker</h1>
            </Container>
        </>

    )
}

export default Home;