let Transaction = require("../../models/transactionModel");
// let User = require("../../models/userModel");
// let Group = require("../../models/createGroupModel");

function handle_request(msg, callback) {
  console.log("Inside get expense kafka backend");
  console.log(msg);
  
  Transaction.find({ g_id: msg })
  .populate({ path: "g_id" })
  .populate({path: "comments.u_id"})
  .populate({ path: "payer_id" })
  .sort({ createdAt: -1 })
  .then((user) => {
    let group_details = [];
    for (let i = 0; i < user.length; i++) {
      let comments = []
      // if(user[i].comments){
      //   console.log(user[i].comments.length)
      // }
      for(j=0;j<user[i].comments.length;j++){
        let commentObj ={
          id: user[i].comments[j]._id,
          name: user[i].comments[j].u_id.name,
          comment: user[i].comments[j].comment,
          created_at: user[i].comments[j].created_at
        }
        // console.log(commentObj)
        comments.push(commentObj)
      }
      let obj = {
        ID: user[i]._id,
        amount: user[i].amount,
        payer_name: user[i].payer_id.name,
        description: user[i].description,
        created_at: user[i].createdAt,
        comments: comments
      };
      group_details.push(obj);
    }
    // console.log(group_details)
    callback(null,group_details)
  });


// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
