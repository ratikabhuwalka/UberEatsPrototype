let Group = require("../../models/creategroupModel");
let Transaction = require("../../models/transactionModel");

function handle_request(msg, callback) {
  console.log("Inside leave group kafka backend");
  console.log(msg);

  Transaction.find(
    { "ower.u_id": msg.current_user, "ower.is_settled": false, g_id: msg.g_id },
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length !== 0) {
          console.log("Due left");
          // res.status(400).send({ msg: "Please Settle your pending balance in the group" });
        } else {
          console.log("leaving");
          const left = await leaveGroup(msg.g_id, msg.current_user);
          console.log(left);
          callback(null, left);
        }
      }
    }
  );
  const leaveGroup = async (g_id, current_user) => {
    Group.findOneAndUpdate(
      { _id: g_id },
      { $pull: { members: { ID: current_user } } },
      { multi: true },
      (err, result) => {
        if (result) {
          console.log(result);
          return { msg: "You left the group successfully" };
        } else {
          console.log(err);
        }
      }
    );
  };

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
