import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';

const Navbars = () => {
    return (
        <div>

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/option/:id">Destination</Nav.Link>
                        <Nav.Link href="">BLog</Nav.Link>
                        <Nav.Link href="">Contact</Nav.Link>
                        <Nav.Link href="/login">LogIn</Nav.Link>

                    </Nav>
                   
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Navbars;