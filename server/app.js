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

app.use(cors({ origin: 'http://ec2-34-220-244-18.us-west-2.compute.amazonaws.com:3000', credentials: true }));

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(function (req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://ec2-34-220-244-18.us-west-2.compute.amazonaws.com:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.use(express.static('./public'));

module.exports = app;