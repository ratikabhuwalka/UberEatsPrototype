import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from "./Components/Header";
import LandingMain from "./Components/LandingPage/LandingMain";
import SignUp from "./Components/LoginPage/SignUp.js"
import Login from "./Components/LoginPage/Login.js"
import { Container } from 'react-bootstrap'

function App() {
  return (
    <React.Fragment>
      <Container>
        <Router>
          <Switch>
            <Route exact path ="/" component ={ LandingMain } /> 
            <Route exact path ="/signup" component ={ SignUp } />
            <Route exact path ="/header" component ={ Header } /> 
            <Route exact path ="/login" component ={ Login } /> 
          </Switch>
        </Router>
      </Container>
      </React.Fragment>
  );
}

export default App;
