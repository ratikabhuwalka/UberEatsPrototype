let Customer = require("../../models/Customer");

function handle_request(msg, callback) {
    console.log("Inside get Fav kafka backend");
    console.log(msg);
    let cust_id = msg.cust_id;

    Customer.findOne({_id:cust_id})
    .select("Favourites")
    .populate('Favourites')
    .exec(function (err, list) {
        if (err){
            return handleError(err);
        } else{
            callback(null, list);
        }
    });
    console.log("after callback");
}

exports.handle_request = handle_request;