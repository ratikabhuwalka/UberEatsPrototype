const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const { secret_key } = require('../utils/config.js');

//const { auth } = require("../utils/Passport");

//auth();

//Route to handle Post Request Call
router.post('/', (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body)
    
    var newUser = new User({
      name : name,
      email: email,
      password: password,
      role: role
  });


    User.findOne({ email:email }, (error, user) => {
      if (error) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end();
    }
    if (user) {
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("User already exists");
    }
    else {
        newUser.save((error, data) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end();
            }
            else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end();
            }
        });
    }
  });
});
  

  module.exports= router