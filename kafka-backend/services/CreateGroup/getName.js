let User = require("../../models/userModel");


function handle_request(msg, callback) {
  console.log("Inside get_Name for create group kafka backend");
  console.log(msg);
  
  User.find({ name: new RegExp(msg, "i") }, (err, result) => {
    if (err) {
        console.log(err)
    //   res.send(err);
    } else {
      let usernames = [];
      for (i = 0; i < result.length; i++) {
        let obj = {
          id: result[i]._id,
          name: result[i].name,
        };
        usernames.push(obj);
      }
      callback(null,usernames)
    //   res.status(200).send(usernames);
    }
  });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
