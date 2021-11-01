let Transaction = require("../../models/transactionModel");
let Group = require("../../models/creategroupModel")


async function handle_request(msg, callback) {
  console.log("Inside get profile kafka backend");
  console.log(msg);
  
//ower list contains all the members of the group, including the payer
  let owersList = await new Promise((resolve, reject) => {
    Group.find({ _id: msg.group_id }, (err, result) => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        if (result.length > 0) {
          let owers = [];
          for (i = 0; i < result[0].members.length; i++) {
            if (result[0].members[i].is_accepted) {
              owers.push(result[0].members[i].ID);
            }
          }
          resolve(owers);
        }
      }
    });
  });
  amount = msg.amount / owersList.length;
  amount_toGet = msg.amount - amount;
  console.log(amount_toGet);
  var owers = [];
  owersList.forEach((user) => {
    if (user != msg.current_user) {
      const userData = {
        u_id: user,
        amount: amount,
        is_settled: 0,
      };
      owers.push(userData);
    }
  });
  //   console.log(owers);

  const transactionDetails = new Transaction({
    g_id: msg.group_id,
    payer_id: msg.current_user,
    amount: msg.amount,
    amountToGetBack: amount_toGet,
    currency: msg.currency,
    description: msg.description,
    ower: owers,
  });
  console.log(transactionDetails);
  transactionDetails.save((err, result) => {
    if (err) {
        console.log(err)
    //   res.status(500).send(err);
    } else {
        callback(null)
    //   res.status(200).json({ msg: "Expense added successfully" });
    }
  });


// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;

