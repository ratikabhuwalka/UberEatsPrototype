let Transaction = require("../../models/transactionModel");
let Group = require("../../models/creategroupModel")

async function handle_request(msg, callback) {
  console.log("Inside get owe details kafka backend");
  console.log(msg);
  group_id=msg


  try {
    let memberList = await new Promise((resolve, reject) => {
      Group.find({ _id: group_id }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
          let members = [];
          for (i = 0; i < result[0].members.length; i++) {
            if (result[0].members[i].is_accepted) {
              members[i] = result[0].members[i].ID;
              // owers.push(result[0].members[i].ID);
            }
          }
          resolve(members);
        }
      });
    });
    // console.log(memberList);
    let totalAmounts = []; //contains each member ower amount
    for (z = 0; z < memberList.length; z++) {
      let owersObj = await new Promise((resolve, reject) => {
        Transaction.find({
          g_id: group_id,
          "ower.u_id": memberList[z],
          "ower.is_settled": false,
        })
          .populate({ path: "g_id" })
          .populate({ path: "payer_id" })
          .populate({ path: "ower.u_id" })
          .then((user) => {
            if (user.length > 0) {
              let amounts = {};
              amounts["amount_owed"] = 0.0 ;
              // amounts["group_name"] = user[0].g_id.g_name
              for (let i = 0; i < user.length; i++) {
                for (let j = 0; j < user[i].ower.length; j++) {
                  if (
                    String(user[i].ower[j].u_id._id) ===
                      String(memberList[z]) &&
                    user[i].ower[j].is_settled == false
                  ) {
                    amounts["name"] = user[i].ower[j].u_id.name;
                    amounts["ower_id"] = user[i].ower[j].u_id._id;
                    amounts["amount_owed"] = (amounts["amount_owed"]*10000 + user[i].ower[j].amount*10000)/10000;
                    amounts["group_name"] = user[0].g_id.g_name;
                  }
                }
              }
              //whenever the settlement is done, there will be an object "amounts" created which will only have amount_owed as key and by default value 0 so to avoid that object from getting pushed  
              if(Object.keys(amounts).length > 1)
              resolve(amounts);
              else 
              resolve(null)
            } else {
              resolve(null);
            }
          });
      });
      // if(Object.keys(owersObj).length > 1){
      //   totalAmounts.push(owersObj)
      // }
      if (owersObj != null) {
        totalAmounts.push(owersObj);
      }
    }
    console.log("Owe details")
    console.log(totalAmounts);
    //to find the users who are just the payers and do not owe anything
    let res4 = await new Promise(async (resolve, reject) => {
      let newMembers = [];
      let newMembersObj = {};
      for (i = 0; i < memberList.length; i++) {
        let found = 0;
        for (j = 0; j < totalAmounts.length; j++) {
          if (String(memberList[i]) == String(totalAmounts[j].ower_id)) {
            found = 1;
            break;
          }
        }
        if (!found) newMembers.push(memberList[i]);
      }

      // newMembers will have an id of 1 user
      if (newMembers.length > 0) {
        Transaction.find({ g_id: group_id, payer_id: newMembers[0] })
          .populate({ path: "g_id" })
          .populate({ path: "payer_id" })
          .then((result) => {
            if (result.length >= 1) {
              newMembersObj = {
                amount_owed: 0,
                name: result[0].payer_id.name,
                group_name: result[0].g_id.g_name,
              };
              resolve(newMembersObj);
            } else {
              resolve(null);
            }
          });
      } else {
        resolve(null);
      }
    });

    if (res4 != null) {
      if (Object.keys(res4).length != 0) {
        totalAmounts.push(res4);
      }
    }

    let payerAmount = [];
    for (z = 0; z < memberList.length; z++) {
      let payersObj = await new Promise((resolve, reject) => {
        Transaction.find({ g_id: group_id, payer_id: memberList[z] })
          .populate({ path: "g_id" })
          .populate({ path: "payer_id" })
          .populate({ path: "ower.u_id" })
          .then((user) => {
            if (user.length > 0) {
              let amounts = {};
              amounts["amount_toGetBack"] = 0.00;
              //   amounts["sumOfOwers"] = 0.0;
              // console.log(user[0])
              for (let i = 0; i < user.length; i++) {
                if (String(user[i].payer_id._id) === String(memberList[z])) {
                  for (j = 0; j < user[i].ower.length; j++) {
                    if (user[i].ower[j].is_settled == false) {
                      amounts["amount_toGetBack"] = (amounts["amount_toGetBack"] * 1000 + user[i].ower[j].amount * 1000)/1000;
                    }
                  }
                  //   console.log(amounts)
                  //   console.log(user[i].amount)
                  amounts["name"] = user[i].payer_id.name;
                  amounts["payer_id"] = user[i].payer_id._id;
                  //   amounts["amount_toGetBack"] = user[i].amount - amounts["sumOfOwers"];
                  amounts["group_name"] = user[0].g_id.g_name;
                }
              }
              resolve(amounts);
            } else {
              resolve(null);
            }
          });
      });
      if (payersObj != null) {
        payerAmount.push(payersObj);
      }
    }
    // console.log("payerAmount")
    // console.log(payerAmount);
    if (payerAmount != null && totalAmounts != null) {
      for (i = 0; i < totalAmounts.length; i++) {
        for (j = 0; j < payerAmount.length; j++) {
          if (payerAmount[j].name == totalAmounts[i].name) {
            totalAmounts[i].amount_owed -= payerAmount[j].amount_toGetBack;
          } else {
          }
        }
      }
    }
    console.log("total Amounts")
    console.log(totalAmounts);
    callback(null,totalAmounts)
    // res.status(200).send(totalAmounts);
  } catch (error) {
    // res.status(400).json({ msg: err });
  }









// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
