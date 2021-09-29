import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from "./Components/Header";
import LandingMain from "./Components/LandingPage/LandingMain";
import SignUp from "./Components/LoginPage/SignUp.js"
import RestaurantSignUp from "./Components/LoginPage/RestaurantSignUp.js"
import Login from "./Components/LoginPage/Login.js"
import RestaurantProfile from './Components/ProfilePage/RestaurantProfile';
import Restaurant from './Components/HomePage/Restaurant';
import CustomerHome from './Components/HomePage/CustomerHome';
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
    <React.Fragment>
      <Container>
        <Router>
          <Switch>
            <Route exact path ="/" component ={ LandingMain } /> 
            <Route exact path ="/signup" component ={ SignUp } />
            <Route exact path ="/restaurantSignUp" component ={ RestaurantSignUp } />
            <Route exact path ="/customerHome" component ={ CustomerHome } />
            <Route path="/restaurant" component={Restaurant} />
            <Route exact path ="/header" component ={ Header } /> 
            <Route exact path ="/login" component ={ Login } /> 
            <Route exact path ='/profile/restaurant' component = {RestaurantProfile} />
          </Switch>
        </Router>
      </Container>
      </React.Fragment>
      </Provider>
  );
}

export default App;
