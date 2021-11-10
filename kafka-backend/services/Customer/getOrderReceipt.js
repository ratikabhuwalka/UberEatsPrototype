
const Order = require("../../models/Order");

async function handle_request(req, callback) { 
    try {
        console.log("req on get order receipt", req);
        const order_id = req.order_id;
        const order = await Order.findOne({_id: order_id})
        console.log("order:", order);
        callback(null, {status_code: 200, response: {data: order}});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;
