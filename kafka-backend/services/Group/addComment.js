let Transaction = require("../../models/transactionModel");


function handle_request(msg, callback) {
  console.log("Inside add Comment kafka backend");
  console.log(msg);
  
  Transaction.updateOne({
    _id: msg.t_id
  },
  {
    $push :{ comments:[{u_id: msg.current_user ,comment: msg.comment }]}

  },
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
        callback(null,result)
    }
  })

// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
