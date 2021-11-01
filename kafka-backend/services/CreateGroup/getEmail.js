let User = require("../../models/userModel");


function handle_request(msg, callback) {
  console.log("Inside get_email for create group kafka backend");
  console.log(msg);
  
  User.find({ email: new RegExp(msg, "i") }, (err, result) => {
    if (err) {
        console.log(err)
    //   res.send(err);
    } else {
      //   console.log(result)
      let userEmails = [];
      for (i = 0; i < result.length; i++) {
        let obj = {
          id: result[i]._id,
          email: result[i].email,
          name: result[i].name,
        };
        userEmails.push(obj);
      }
      callback(null,userEmails)
    //   res.status(200).send(userEmails);
    }
  });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
