import React from 'react';
//import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Header.css'



function Header() {
    return (
        // <Navbar expand="lg">
        //     <Navbar.Brand href ="/"> Uber Eats</Navbar.Brand>
        //     <Navbar.Toggle aria-controls = "basic-navbar-nav" />
        //     <Navbar.Collapse id='test'>    
        //         <Nav className="ml-auto">
        //             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //             <NavDropdown.Item href="/login">Login</NavDropdown.Item>
        //             <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
        //             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //             <NavDropdown.Divider />
        //             <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        //         </NavDropdown>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>  



        <div className='header'>
            <img className = 'header_icon'
                src="https://1000logos.net/wp-content/uploads/2021/04/Uber-Eats-logo-500x281.png"
                alt="Uber Eats Icon"
            />

            <div className = 'header_right'>
                <a href='/login'>Login</a>
                <a href='/customerSignup'>Signup</a>
            </div>
        </div>
    
    );
}

Header.propTypes = {

}

export default Header

