import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import cartIcon from "../images/cart.png";
import menuIcon from "../images/menu.png";
import historyIcon from "../images/history.jpeg";
import futureIcon from "../images/future.jpeg";
import userIcon from "../images/user.png";
import logoutIcon from "../images/logout.png";
import { userLogout } from '../actions/loginAction'
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

//create the Navbar Component
class Navigationbar extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem("name")
    }
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    window.localStorage.clear();
    this.props.userLogout();
  };

  render() {
    let navUser = null;
    let pendingOrders = null;
    let common = null;
    let profile = "/customerProfile";
    let home ='/'
    let order ='/customerOrder'


    if (localStorage.getItem("is_owner") === "true") {
      profile = '/restaurantProfile'
      home = '/restaurant'
      order = '/restaurantOrder'
    }
    if (localStorage.getItem("is_owner") === "false") {
      home = '/customerHome'

    }

    common = (<Nav>
      <Nav.Link><Link to = {profile} class="nav-link"><img src={userIcon} width="20" height="auto" class="d-inline-block align-top" alt="" />&nbsp;&nbsp;Profile</Link></Nav.Link>
      <Nav.Link><Link to={order} class="nav-link"><img src={historyIcon} width="20" height="auto" class="d-inline-block align-top" alt="" />&nbsp;&nbsp;Past Orders</Link></Nav.Link>
      </Nav>
    );

    if (localStorage.getItem("user_id")) {
      if (localStorage.getItem("is_owner")==="true") {
        navUser = (
          <div class="collapse navbar-collapse navbar-right" id="navbarNav">
            {common}
            <Nav.Link><Link to={{pathname: "/itempage", props:{type:'ADD'}}}>Add new Dish</Link></Nav.Link>
            <Nav.Link><Link to="/" class="nav-link" onClick={this.handleLogout}><img src={logoutIcon} width="20" height="auto" class="d-inline-block align-top" alt="" />&nbsp;&nbsp;Logout</Link></Nav.Link>
          </div>
        );
      }
      else {
        navUser = (
          <div class="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="ml-auto">
            </Nav>
            <Nav.Link>{common}</Nav.Link>
            <Nav.Link>
              <Link to="/favourites" class="nav-link" href="#">Favourites</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/cart" class="nav-link" href="#">
                <img src={cartIcon} width="35" height="auto" class="d-inline-block align-top" alt="Cart" />
                Cart
              </Link>
            </Nav.Link>
            <Nav.Link><Link to="/" class="nav-link" onClick={this.handleLogout}><img src={logoutIcon} width="20" height="auto" class="d-inline-block align-top" alt="" />&nbsp;&nbsp;Logout</Link></Nav.Link>
          </div>

        );
      }
    }
    else {
      navUser = (
        <div class="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="ml-auto">
          </Nav>
          <Nav.Link><Link to="/login" class="nav-link">&nbsp;Login</Link></Nav.Link>
          <Nav.Link><Link to="/customerSignup" class="nav-link">&nbsp;SignUp</Link></Nav.Link>
        </div>

      );
    }

    return (
      <div>
        <Navbar>
          <Navbar.Brand>
            <Link to={home} class="nav-link" href="#">
            <img className = 'header_icon'
                src="https://1000logos.net/wp-content/uploads/2021/04/Uber-Eats-logo-500x281.png"
                alt="Uber Eats Icon" />            
            </Link>
          </Navbar.Brand>
          {navUser}
        </Navbar>
      </div>
    );
  }
}

export default connect(null, { userLogout })(Navigationbar);
