"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const {Restaurant} = require("../models/Restaurant")
const Customer = require("../models/Customer")
var { secret_key } = require("./keys");

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("JWT"),
        secretOrKey: secret_key
    };
    passport.use("restaurant",
        new JwtStrategy( opts, (jwt_payload, callback) => {
            const user_id = jwt_payload.RestId;
            console.log("jwt", jwt_payload);
            Restaurant.findById(user_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

function custauth() {
    console.log("in customer authentication")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("JWT"),
        secretOrKey: secret_key
    };
    passport.use("customer",
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload.CustId;
            console.log("jwt from custAuth", jwt_payload);
            Customer.findById(user_id, (err, results) => {
                if (err) {

                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}



exports.auth = auth;
exports.custauth = custauth;
exports.checkAuth = passport.authenticate("restaurant", { session: false });
exports.checkAuthCust = passport.authenticate("customer", { session: false });


