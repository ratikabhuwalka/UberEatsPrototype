let Group = require("../../models/creategroupModel")


function handle_request(msg, callback) {
  console.log("Inside get_names for dashboard kafka backend");
  console.log(msg);
  
  Group.find({ _id: msg }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log(result[0].g_name)
      callback(null,result[0].g_name)
    //   res.status(200).send(result[0].g_name);
    }
  });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
