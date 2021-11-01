let Group = require("../../models/creategroupModel")


function handle_request(msg, callback) {
  console.log("Inside get_ids for dashboard kafka backend");
  console.log(msg);
  
  Group.find(
    { "members.ID": msg, "members.is_accepted": true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        groups = [];
        for (i = 0; i < result.length; i++) {
          groups[i] = result[i]._id;
        }
        callback(null,groups)
        // res.status(200).send(groups);
      }
    }
  );

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
