let {Restaurant} = require("../../models/Restaurant");

async function handle_request(msg, callback) { 
    try {
        const { rest_id, rest_name, rest_country, rest_phone, rest_email, rest_city, start_time, end_time, rest_type} = msg;

        const update = {
            RestName: rest_name,
            RestEmail: rest_email,
            RestCity: rest_city,
            RestCountry : rest_country,
            RestPhone: rest_phone,
            StartTime : start_time,
            EndTime : end_time,
            RestType : rest_type
        }
        const result = await Restaurant.findByIdAndUpdate(rest_id, update, { new:true });
        callback(null, {status_code: 200, response: result});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;
