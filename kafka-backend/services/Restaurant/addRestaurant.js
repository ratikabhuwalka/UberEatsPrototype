let {Restaurant} = require("../../models/Restaurant");
var bcrypt = require("bcryptjs");

async function handle_request(msg, callback) {
  console.log("Inside add restaurant kafka backend");
  console.log(msg);

  try {
    const { restName, restEmail, restPass, restPhone, restCity, restCountry,
      startTime, endTime, restType } = msg;

    var pass  = await bcrypt.hash(restPass, 10);

 
    Restaurant.findOne({ RestEmail: msg.restEmail }, (err, result) => {
      if (err) {
        console.log("error in findOne");
        //   res.end();
      }
      if (result) {
        callback(null, "Restaurant Already Exists");
        // res.status(400).json({ msg: "group already exists" });
      } else {
        const newRest = new Restaurant({
          RestName: restName,
          RestEmail: restEmail,
          RestPass: pass,
          RestCity: restCity,
          RestCountry : restCountry,
          RestPhone: restPhone,
          StartTime : startTime,
          EndTime : endTime,
          RestType : restType,
          Dishes : [] 

        })
        newRest.save((err, result) => {
          if (err) {
            console.log("cannot create restaurant");
            // callback(err)
            //   res.status(500).send(err);
          } else {
            console.log("Restaurant Created");
            callback(null, "Restaurant Created");
            //   res.status(200).json({ msg: "Group Created successfully" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    callback("");
  }

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
