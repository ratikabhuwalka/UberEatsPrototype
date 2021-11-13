let {Restaurant} = require("../../models/Restaurant");

async function handle_request(msg, callback) { 
    try {
        const {rest_id, url} = msg;   
        console.log("msg", msg);
        const result = await Restaurant.findOneAndUpdate({_id:rest_id}, {RestImage: url},
                            function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Rest : ", docs);
            };
        });
        console.log("res",result);
        callback(null, {status_code: 200, response: result});
        return;
           
    }
    catch(error) {
        console.log("error on kafka backend",error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;
