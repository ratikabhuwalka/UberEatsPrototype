const { resolve } = require("path");
let Transaction = require("../../models/transactionModel")


async function handle_request(msg, callback) {
  console.log("Inside settle for dashboard kafka backend");
  console.log(msg);
  
  let TransactionId = await new Promise((resolve, reject) => {
    Transaction.find({ payer_id: msg.payer_id, g_id: msg.g_id }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let id = [];
        for (i = 0; i < result.length; i++) {
          id.push(result[i]._id);
        }
        // console.log(id)
        resolve(id);
      }
    });
  });
  console.log(TransactionId);
  
  let normalSettle = await new Promise((resolve,reject) =>{
      
      for (i = 0; i < TransactionId.length; i++) {
        Transaction.updateOne(
          { _id: TransactionId[i], "ower.u_id": msg.current_user },
          {
            $set: {
              "ower.$.is_settled": true,
            },
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
                // console.log(result)
            }
          }
        );
      }
      resolve(null)

  })

  let TransactionIdForCurrentUser = await new Promise((resolve, reject) => {
    Transaction.find({ payer_id: msg.current_user, g_id: msg.g_id }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let id = [];
        for (i = 0; i < result.length; i++) {
          id.push(result[i]._id);
        }
        // console.log(id)
        resolve(id);
      }
    });
});
console.log(TransactionIdForCurrentUser)

let reverseSettle = await new Promise((resolve,reject) =>{

    for (i = 0; i < TransactionIdForCurrentUser.length; i++) {
            Transaction.updateOne(
              { _id: TransactionIdForCurrentUser[i], "ower.u_id": msg.payer_id },
              {
                $set: {
                  "ower.$.is_settled": true,
                },
              },
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                //   console.log(result);
                }
              }
            );
          }
          resolve(null)

})
    console.log("all done")
      callback(null)
// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
