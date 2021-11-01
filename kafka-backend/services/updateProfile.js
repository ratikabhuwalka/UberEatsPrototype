let User = require("./../models/userModel");

function handle_request(msg, callback) {
  console.log("Inside update profile kafka backend");
  console.log(msg);

  User.findByIdAndUpdate(
    msg.id,
    {
      $set: {
        phoneNumber: msg.phoneNumber,
        defaultCurrency: msg.defaultCurrency,
        timeZone: msg.timezone,
        language: msg.language,
        email: msg.email,
        name: msg.username,
      },
    },
    (err, result) => {
      if (err) {
        callback(null, "Error");
        // console.log(err);
      } else {
        // console.log(result);
        callback(null, result);
      }
    }
  );

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
