let Customer = require("../../models/Customer");
var bcrypt = require("bcryptjs");

async function handle_request(msg, callback) {
  console.log("Inside add customer kafka backend");
  console.log(msg);

  try {
    const { CustName, CustEmail, CustPass, CustPhone, CustCity, CustCountry,
      DOB } = msg;

    var pass  = await bcrypt.hash(CustPass, 10);

 
    Customer.findOne({ CustEmail: msg.CustEmail }, (err, result) => {
      if (err) {
        console.log("error in findOne");
        //   res.end();
      }
      if (result) {
        callback(null, "User Already Exists");
        // res.status(400).json({ msg: "group already exists" });
      } else {
        const newCust = new Customer({
          CustName: CustName,
          CustEmail: CustEmail,
          CustPass: pass,
          CustCity: CustCity,
          CustCountry : CustCountry,
          CustPhone: CustPhone,
          DOB: DOB,
          Favourites : [],
          DeliveryAdds: []
        })

        newCust.save((err, result) => {
          if (err) {
            console.log("cannot create Customer");
            // callback(err)
            //   res.status(500).send(err);
          } else {
            console.log("Customer Created");
            callback(null, "User Created");
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
