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
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Cart/Checkout';
import Order from './Components/OrderPage';
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
            <Route path="/cart" component={Cart} />
            <Route exact path ="/login" component ={ Login } /> 
            <Route exact path ='/restaurantProfile' component = {RestaurantProfile} />
            <Route exact path ='/customerProfile' component = {CustomerProfile} />
            <Route exact path ='/checkout' component = {Checkout} />
            <Route exact path ='/orders' component = {Order} />


          </Switch>
        </Router>
      </Container>
      </React.Fragment>
      </Provider>
  );
}

export default App;
