let Group = require("../../models/creategroupModel");

function handle_request(msg, callback) {
  console.log("Inside get joined kafka backend");
  console.log(msg);

  Group.find(
    {
      members: {
        $elemMatch: { ID: msg, is_accepted: 1 },
      },
    },
    (err, result) => {
      if (err) {
        console.log("Error");
        console.log(err);
      } else {
        let dbNotJoinedGroups = [];
        for (let i = 0; i < result.length; i++) {
          let notgroupobj = {
            g_id: result[i]._id,
            name: result[i].g_name,
          };
          dbNotJoinedGroups.push(notgroupobj);
        }
        // console.log(dbNotJoinedGroups);
        callback(null,dbNotJoinedGroups)
      }
    }
  );

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
