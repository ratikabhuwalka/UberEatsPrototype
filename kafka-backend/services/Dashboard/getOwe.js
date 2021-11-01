let Transaction = require("../../models/transactionModel")


function handle_request(msg, callback) {
  console.log("Inside get_owe for dashboard kafka backend");
  console.log(msg);
  
  Transaction.find({ "ower.u_id": msg, "ower.is_settled": false })
    .populate({ path: "ower.u_id" })
    .then((result) => {
      // console.log(result);
      let owerAmountDetails = {
        owedAmount: 0,
      };
      for (i = 0; i < result.length; i++) {
        for (j = 0; j < result[i].ower.length; j++) {
          if (String(result[i].ower[j].u_id._id) === String(msg) &&  result[i].ower[j].is_settled == false) {
            owerAmountDetails.owedAmount += result[i].ower[j].amount;
          }
        }
      }
      callback(null,owerAmountDetails)
    });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
