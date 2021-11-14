let {Restaurant} = require("../../models/Restaurant");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { secret_key } = require("../../config/keys");
const {auth } = require("../../config/passport");
auth();

async function handle_request(msg, callback) { 
    try {
        const { dish_id, rest_id, url} = msg;
        console.log(msg)
        const rest = await Restaurant.findById(rest_id);
        let dish = rest.Dishes.id(mongoose.Types.ObjectId(dish_id));
        dish.set({DishImage: url});
        let result = await rest.save();
        callback(null, {status_code: 200, response: { data: result, dish}});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}
exports.handle_request = handle_request;
