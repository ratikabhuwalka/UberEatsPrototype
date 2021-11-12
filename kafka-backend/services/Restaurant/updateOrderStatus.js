let Order = require("../../models/Order");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { secret_key } = require("../../config/keys");
const {auth } = require("../../config/passport");
auth();

async function handle_request(msg, callback) { 
    try {
        console.log("request received in update status kafka backend:",msg);
        const { order_id, status} = msg
        const update = {
            Status : status
        }
        const result = await Order.findByIdAndUpdate(order_id, update, { new:true });
        callback(null, {status_code: 200, response: { data: result}});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}
exports.handle_request = handle_request;
