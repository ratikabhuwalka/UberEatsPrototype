import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  uri:  `http://localhost:3001/graphql`,
});


ReactDOM.render(
  
  <React.StrictMode>
    <ApolloProvider client = {client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
 
  document.getElementById('root')
);

reportWebVitals();
