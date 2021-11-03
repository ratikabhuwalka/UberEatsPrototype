let Restaurant = require("../../models/Restaurant");
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
      await Restaurant.find({_id: rest_id}, (err, result) => {
      if (err) {
        console.log("error in findOne");
        //   res.end();
      }
      else {
        if (result) {
            console.log("result",result);
            callback(null, result);        
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
