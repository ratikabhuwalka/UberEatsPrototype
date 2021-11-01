let User = require('../../models/userModel');


function handle_request(msg, callback) {
  console.log("Inside User Default Currency kafka backend");
  console.log(msg);
  
User.find({ _id: msg }, (err, result) => {
    if (err) {
        console.log(err)
    } else {
      let curr = {
        default_currency: result[0].defaultCurrency,
      };
      callback(null,curr)
    }
  });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
