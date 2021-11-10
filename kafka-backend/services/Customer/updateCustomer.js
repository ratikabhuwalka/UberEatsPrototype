let Customer = require("../../models/Customer");

async function handle_request(msg, callback) { 
    try {
        const { cust_id, cust_name, cust_country, cust_phone, cust_email, cust_city, dob} = msg;
        console.log(msg);
        const update = {
            CustName: cust_name,
            CustEmail: cust_email,
            CustCity: cust_city,
            CustCountry : cust_country,
            CustPhone: cust_phone,
            DOB : dob
        }
        const result = await Customer.findByIdAndUpdate(cust_id, update, { new:true });
        console.log(result);
        callback(null, {status_code: 200, response: result});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;
