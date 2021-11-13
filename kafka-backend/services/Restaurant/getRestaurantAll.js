let {Restaurant} = require("../../models/Restaurant");
// const jwt = require("jsonwebtoken");
// const { secret_key } = require("../../config/keys");
// const {auth } = require("../../config/passport");
// auth();

async function handle_request(msg, callback) {
  console.log("Inside get restaurant all kafka backend");
  console.log(msg);

  try {
      console.log(msg);
      search_string = msg.search_string

      if (search_string.length >0 && search_string !='_'){ 
        let searchStringRegex = new RegExp(search_string, "i");

        await Restaurant.find({ $or: [ {RestName: searchStringRegex}, {RestCity: searchStringRegex}, {'Dishes.DishName': searchStringRegex}, {'Dishes.Category': searchStringRegex}]})
      .then((result) => {
          if (result) {
            console.log("result",result);
            callback(null, result);
          } else {
              console.log('NO DATA');
          }
                  
    })
      .catch((err) => {
          console.log(err);
      })
    }
     else{

     
      await Restaurant.find({}, (err, result) => {
      if (err) {
        console.log("error in find all restaurant");
        //   res.end();

        //TODO: search restaurant by search string
      }
      else {
        if (result) {
            console.log("result",result);
            callback(null, result);        
        }
        else {
            console.log("Restaurant doesn't exist");
            callback(null, "Restaurant doesn't exist");

            //   res.status(400).json({ msg: "User doesn't exist" });
            }
        }
      });
    }
  }
  catch (error) {
    console.log(error);
    callback("");
  }
  
  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
