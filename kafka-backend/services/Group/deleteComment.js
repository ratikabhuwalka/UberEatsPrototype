let Transaction = require("../../models/transactionModel");


function handle_request(msg, callback) {
  console.log("Inside delete Comment kafka backend");
  console.log(msg);
  
  Transaction.findOneAndUpdate(
    { "comments._id": msg },
    { $pull: { comments: { _id: msg } } },
    { multi: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
          callback(null)
      }
    }
  );

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
