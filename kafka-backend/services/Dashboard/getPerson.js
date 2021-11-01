let Transaction = require("../../models/transactionModel")


function handle_request(msg, callback) {
  console.log("Inside get_person for dashboard kafka backend");
  console.log(msg);
  
  Transaction.find({
    "ower.u_id": msg.current_user,
    "ower.is_settled": false,
    g_id: msg.g_id
    // "payer_id.$.name": new RegExp(req.body.name, "i"),
  })
    .populate({ path: "payer_id" })
    .then((result) => {
      // console.log(result);
      let dbPersonNames = [];
      for (let i = 0; i < result.length; i++) {
        let personNamesObj = {
          payer_id: result[i].payer_id._id,
          name: result[i].payer_id.name,
        };
        dbPersonNames.push(personNamesObj);
      }
      // console.log(dbPersonNames);
      const uniqueArray = dbPersonNames.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return (
          index ===
          dbPersonNames.findIndex((obj) => {
            return JSON.stringify(obj) === _thing;
          })
        );
      });
      callback(null,uniqueArray)
    });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
