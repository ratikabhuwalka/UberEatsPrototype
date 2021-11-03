let Restaurant = require("../../models/Restaurant");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret_key } = require("../../config/keys");
const {auth } = require("../../config/passport");
auth();

function handle_request(msg, callback) {
  console.log("Inside login restaurant kafka backend");
  console.log(msg);

  try {
    Restaurant.findOne({ RestEmail: msg.restEmail}, (err, result) => {
      if (err) {
        console.log("error in findOne");
        //   res.end();
      }
      else {
        if (result) {
            console.log("result",result);
            //if (bcrypt.compareSync(msg.restPass, result.RestPass)) {
            if (msg.restPass === result.RestPass) {
                const payload = {
                restId: result._id,
                restName: result.restName,
                restEmail: result.restEmail
                };
                const token = jwt.sign(payload, secret_key);
                // res.status(200).end("JWT " + token);
                callback(null, "JWT " + token);
            // res.status(400).json({ msg: "group already exists" });
        } else {
            console.log("wrong password");
            callback(null, "Wrong Password");
            // res.status(401).json({ msg: "Wrong Password" });
        } 
        
    }
    else {
        console.log("Restaurant doesn't exist");
        callback(null, "Restaurant doesn't exist");

        //   res.status(400).json({ msg: "User doesn't exist" });
          }
        }
    });

  } catch (error) {
    console.log(error);
    callback("");
  }
  
  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;