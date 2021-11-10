let Customer = require("../../models/Customer");
// const jwt = require("jsonwebtoken");
// const { secret_key } = require("../../config/keys");
// const {auth } = require("../../config/passport");
// auth();

async function handle_request(msg, callback) {
  console.log("Inside get customer by id kafka backend");
  console.log(msg);

  try {
        console.log(msg);
        cust_id = msg.cust_id
        const cust =await Customer.findOne({_id: cust_id})
        
        if (cust) {
            console.log("result",cust);
            callback(null, cust);        
        }
        else {
            console.log("Customer doesn't exist");
            callback(null, "Customer doesn't exist");
        }

  } catch (error) {
    console.log(error);
    callback("");
  }
  
  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
