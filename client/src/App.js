import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from "./Components/Header";
import LandingMain from "./Components/LandingPage/LandingMain";
import SignUp from "./Components/LoginPage/SignUp.js"
import RestaurantSignUp from "./Components/LoginPage/RestaurantSignUp.js"
import Login from "./Components/LoginPage/Login.js"
import RestaurantProfile from './Components/ProfilePage/RestaurantProfile';
import CustomerHome from './Components/HomePage/CustomerHome';
import { Container } from 'react-bootstrap'

function App() {
  return (
    <React.Fragment>
      <Container>
        <Router>
          <Switch>
            <Route exact path ="/" component ={ LandingMain } /> 
            <Route exact path ="/signup" component ={ SignUp } />
            <Route exact path ="/restaurantSignUp" component ={ RestaurantSignUp } />
            <Route exact path ="/customerHome" component ={ CustomerHome } />

            <Route exact path ="/header" component ={ Header } /> 
            <Route exact path ="/login" component ={ Login } /> 
            <Route exact path ='/profile/restaurant' component = {RestaurantProfile} />
          </Switch>
        </Router>
      </Container>
      </React.Fragment>
  );
}

export default App;
