let Customer = require("../../models/Customer");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret_key } = require("../../config/keys");

async function handle_request(msg, callback) {
  console.log("Inside login customer kafka backend");
  console.log(msg);

  try {
    Customer.findOne({ CustEmail: msg.custEmail}, (err, result) => {
      if (err) {
        console.log("error in findOne");
        //   res.end();
      }
      else {
        if (result) {
            console.log("result",result);
          if (bcrypt.compareSync(msg.custPass, result.CustPass)) {
            //if (msg.restPass === result.RestPass) {
                const payload = {
                CustId: result._id,
                CustName: result.CustName,
                CustEmail: result.CustEmail,
                CustCity : result.CustCity,
                IsOwner: false
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
        callback(null, "User Not Found");

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
