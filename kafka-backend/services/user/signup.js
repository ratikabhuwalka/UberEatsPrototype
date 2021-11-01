var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let User = require("../../models/userModel");

async function handle_request(msg, callback) {
  console.log("Inside signup kafka backend");
  console.log(msg);

  let name = msg.name;
  let email = msg.email;
  let password = await bcrypt.hash(msg.password, 10);

  const newUser = new User({
    name,
    email,
    password,
  });
  User.findOne({ email: msg.email }, (err, result) => {
    if (result) {
      console.log("found");
      console.log(result);
      callback(null, "Already exists");
    } else {
      newUser.save((err, result) => {
        if (err) {
          // res.status(500).send();
        } else {
          const payload = {
            id: result._id,
            username: msg.name,
            email: msg.email,
          };
          const token = jwt.sign(payload, secret);
          callback(null, "JWT " + token);
        }
      });
    }
  });

  // .then((user) => res.json(user))
  // .catch((err) => res.status(400).json("Error: " + err));

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
