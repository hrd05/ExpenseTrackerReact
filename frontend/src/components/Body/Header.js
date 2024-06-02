import { Container, Nav, Navbar } from 'react-bootstrap';
// import classes from './Header.module.css';

const Header = () => {

    return (
        <Navbar className="navbar-dark bg-primary">
            <Container>
                <Navbar.Brand href='#home' >ExpenseTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav className='me-auto'>
                    <Nav.Link href='#home' >Home</Nav.Link>
                    <Nav.Link href='#login' >Login</Nav.Link>
                    {/* <Nav.Link>Logout</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    )

}

export default Header;