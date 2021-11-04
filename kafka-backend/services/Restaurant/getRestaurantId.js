let {Restaurant} = require("../../models/Restaurant");
// const jwt = require("jsonwebtoken");
// const { secret_key } = require("../../config/keys");
// const {auth } = require("../../config/passport");
// auth();

async function handle_request(msg, callback) {
  console.log("Inside get restaurant by id kafka backend");
  console.log(msg);

  try {
        console.log(msg);
        rest_id = msg.rest_id
        const rest =await Restaurant.findOne({_id: rest_id})
        
        if (rest) {
            console.log("result",rest);
            callback(null, rest);        
        }
        else {
            console.log("Restaurant doesn't exist");
            callback(null, "Restaurant doesn't exist");
        }

  } catch (error) {
    console.log(error);
    callback("");
  }
  
  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
