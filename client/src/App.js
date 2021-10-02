import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LandingMain from "./Components/LandingPage/LandingMain";
import CustomerSignUp from './Components/LoginPage/CustomerSignUp';
import RestaurantSignUp from "./Components/LoginPage/RestaurantSignUp.js"
import Login from "./Components/LoginPage/Login.js"
import RestaurantProfile from './Components/ProfilePage/RestaurantProfile';
import CustomerProfile from './Components/ProfilePage/CustomerProfile';
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
            <Route exact path ="/customerSignup" component ={ CustomerSignUp } />
            <Route exact path ="/restaurantSignUp" component ={ RestaurantSignUp } />
            <Route exact path ="/customerHome" component ={ CustomerHome } />
            <Route path="/restaurant" component={Restaurant} />
            <Route exact path ="/login" component ={ Login } /> 
            <Route exact path ='/restaurantProfile' component = {RestaurantProfile} />
            <Route exact path ='/customerProfile' component = {CustomerProfile} />

          </Switch>
        </Router>
      </Container>
      </React.Fragment>
      </Provider>
  );
}

export default App;
