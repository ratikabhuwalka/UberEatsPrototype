let Group = require("../../models/creategroupModel");


function handle_request(msg, callback) {
  console.log("Inside get join Group kafka backend");
  console.log(msg);

    Group.updateOne(
    {
      _id: msg.group_id,
      "members.ID": msg.current_user,
    },
    {
      $set: { "members.$.is_accepted": true },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null,result)
      }
    }
  );


// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
