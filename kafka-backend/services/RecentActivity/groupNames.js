let Group = require("../../models/creategroupModel");

function handle_request(msg, callback) {
  console.log("Inside get Group Names for recentActivity kafka backend");
  console.log(msg);

  Group.find(
    { "members.ID": msg, "members.is_accepted": true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        groupMembers = [];
        for (i = 0; i < result.length; i++) {
          groupMembers[i] = result[i].g_name;
        }
        callback(null,groupMembers)
      }
    }
  );


// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
