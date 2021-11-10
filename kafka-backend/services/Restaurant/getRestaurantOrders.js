const Order = require("../../models/Order");

async function handle_request(req, callback) { 
    try {
        console.log("req on get rest order", req);
        const rest_id = req.rest_id;
        const orders = await Order.find({RestId: rest_id})
        console.log("orders:", orders);
        callback(null, {status_code: 200, response: {data: orders}});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;
