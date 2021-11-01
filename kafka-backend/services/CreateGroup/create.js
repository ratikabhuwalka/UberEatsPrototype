let Group = require("../../models/creategroupModel");

function handle_request(msg, callback) {
  console.log("Inside create group kafka backend");
  console.log(msg);

  try {
    var members = [];
    msg.users.forEach((user) => {
      const userData = {
        ID: user,
        is_accepted: user == msg.group_admin ? 1 : 0,
      };
      members.push(userData);
    });
    // console.log(members);

    const newGroup = new Group({
      g_name: msg.g_name,
      members: members,
    });
    console.log(newGroup);
    Group.findOne({ g_name: msg.g_name }, (err, result) => {
      if (err) {
        console.log("error in findOne");
        //   res.end();
      }
      if (result) {
        callback(null, "Group Already Exists");
        // res.status(400).json({ msg: "group already exists" });
      } else {
        newGroup.save((err, result) => {
          if (err) {
            console.log("cannot create group");
            // callback(err)
            //   res.status(500).send(err);
          } else {
            console.log("group Created");
            callback(null, "Group Created");
            //   res.status(200).json({ msg: "Group Created successfully" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    callback("");
  }

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
