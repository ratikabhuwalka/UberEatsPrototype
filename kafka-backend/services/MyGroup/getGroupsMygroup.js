let Group = require("../../models/creategroupModel");


function handle_request(msg, callback) {
  console.log("Inside get Group kafka backend");
  console.log(msg);

    Group.find(
    {
      members: {
        $elemMatch: { ID: msg.current_user, is_accepted: 1 },
      },
      g_name: new RegExp(msg.name, "i"),
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let dbgroupnames = [];
        for (let i = 0; i < result.length; i++) {
          let groupobj = {
            g_id: result[i]._id,
            name: result[i].g_name,
          };
          dbgroupnames.push(groupobj);
        }
        callback(null,dbgroupnames)
    }
    }
  );


// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
