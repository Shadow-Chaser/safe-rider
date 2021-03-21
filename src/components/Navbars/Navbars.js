import React, { useContext } from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { UserContext } from '../../App';

const Navbars = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>

            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Safe Ride</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/option/:id">Destination</Nav.Link>
                        <Nav.Link >Blog</Nav.Link>
                        <Nav.Link >Contact</Nav.Link>
                        <Nav.Link href="/login">LogIn</Nav.Link>
                        <h3>{loggedInUser.name}</h3>

                    </Nav>
                   
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Navbars;