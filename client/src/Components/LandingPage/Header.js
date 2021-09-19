import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';



const Header = props => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href ="/"> Uber Eats</Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav" />
            <Navbar.Collapse id='test'>    
                <Nav className="ml-auto">
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>  
    
    )
}

Header.propTypes = {

}

export default Header

