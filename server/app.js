//import express module 
var express = require('express');
//create  an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
//require cookie parser
var cookieParser = require('cookie-parser');
//import cors
const cors = require('cors');
const {ApolloServer, gql} = require('apollo-server-express');

const {typeDefs} = require("./graphql/typeDefs.js");
const {resolvers} = require("./graphql/resolvers/customers");



// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
      playground: true,
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

//server.applyMiddleware({ app });


const { mongoDB } = require('../kafka-backend/config/keys.js');
const mongoose = require('mongoose');
const passport = require("passport");
const checkAuth = require('../kafka-backend/config/passport');

require('../kafka-backend/config/passport')
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

//app.use(cors({ origin: 'http://ec2-3-141-100-248.us-east-2.compute.amazonaws.com:3000', credentials: true }));

app.use(cors({ origin: '*', credentials: true }));
//app.use(cors({ origin: 'https://studio.apollographql.com', credentials: true }));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});



// app.listen({port: 4000}, () =>
//     console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
//   );



mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500
  })
  .then(() => console.log("Connected to DB"));


app.use(express.static('./public'));

module.exports = app;