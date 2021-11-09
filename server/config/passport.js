"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const {Restaurant} = require("../models/Restaurant")
var { secret_key } = require("./keys");

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("JWT"),
        secretOrKey: secret_key
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
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

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


