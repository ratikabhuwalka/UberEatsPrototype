var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let User = require("../../models/userModel");

function handle_request(msg, callback) {
  console.log("Inside login kafka backend");
  console.log(msg);

  console.log(msg.email);
  User.find(
    {
      email: msg.email,
    },
    (err, result) => {
      if (err) {
        console.log("error");
        // res.status(400).json({ msg: err });
      } else {
        if (result) {
          if (bcrypt.compareSync(msg.password, result[0].password)) {
            const payload = {
              id: result[0]._id,
              username: result[0].name,
              email: result[0].email,
            };
            const token = jwt.sign(payload, secret);
            // res.status(200).end("JWT " + token);
            callback(null, "JWT " + token);
            // res.send(result)
          } else {
            console.log("wrong password");
            callback(null, "Wrong Password");
            // res.status(401).json({ msg: "Wrong Password" });
          }
        } else {
          console.log("User doesn't exist");
          callback(null, "User doesn't exist");

          //   res.status(400).json({ msg: "User doesn't exist" });
        }
      }
    }
  );
  // .then((user) => res.json(user))
  // .catch((err) => res.status(400).json("Error: " + err));

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
