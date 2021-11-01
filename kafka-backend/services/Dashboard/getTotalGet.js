let Transaction = require("../../models/transactionModel")


function handle_request(msg, callback) {
  console.log("Inside get_totalGet for dashboard kafka backend");
  console.log(msg);
  
  Transaction.find({ payer_id: msg })
    .populate({ path: "ower.u_id" })
    .then((result) => {
      // console.log(result)
      let payerAmountDetails = {
        GetBackAmount: 0,
      };
      for (i = 0; i < result.length; i++) {
        for (j = 0; j < result[i].ower.length; j++) {
          if (result[i].ower[j].is_settled == false) {
            // console.log(result[i].description)
            // console.log(result[i].ower[j].u_id.name)
            // console.log(result[i].ower[j].amount)

            payerAmountDetails.GetBackAmount += result[i].ower[j].amount;
          }
        }
      }
      callback(null,payerAmountDetails)
    });

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
