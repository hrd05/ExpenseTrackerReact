import { Button, Container, Nav, Navbar } from 'react-bootstrap';
// import classes from './Header.module.css';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const authCtx = useContext(AuthContext);

    return (
        <Navbar className="navbar-dark bg-primary bg-gradient">
            <Container>
                <Navbar.Brand href='#home' >ExpenseTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav className='me-auto'>
                    <Nav.Link as={Link} to="/home" >Home</Nav.Link>
                    {!authCtx.isLogin && <Nav.Link as={Link} to="/auth" >Login</Nav.Link>}
                    {authCtx.isLogin && <Button variant="outline-light" className="mx-2" onClick={authCtx.logout}>
                        Logout
                    </Button>}
                    {/* <Nav.Link>Logout</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    )

}

export default Header;