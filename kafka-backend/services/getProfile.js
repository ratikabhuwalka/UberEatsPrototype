let User = require("./../models/userModel");


function handle_request(msg, callback) {
  console.log("Inside get profile kafka backend");
  console.log(msg);
  
User.find({email: msg.email},(err,result)=>{
     if(err){
         console.log("error")
     }else{
         callback(null,result)
     }
 });


// callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
