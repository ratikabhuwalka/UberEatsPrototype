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

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//use express session to maintain session data
// app.use(session({
//   secret              : 'cmpe273_kafka_passport_mongo',
//   resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//   saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//   duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//   activeDuration      :  5 * 60 * 1000
// }));

app.use(express.static('./public'));

module.exports = app;