const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db_config.js');

//const pool = require('../pool.js');


// create new restaurant
router.post('/', (req, res) => {
    console.log("Request reached!");
    const restName = req.body.restName;
    const restEmail = req.body.restEmail;
    const restPass = passwordHash.generate(req.body.restPass);
    const restPhone = req.body.restPhone;
    const restCity = req.body.restCity;
    const restCountry = req.body.restCountry;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const restType = req.body.restType;


    var sql_query = "INSERT INTO Restaurant (RestName, RestEmail, RestPass, RestPhone, RestCity, RestCountry, StartTime, EndTime, RestType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sql_query, [restName, restEmail, restPass, restPhone, restCity, restCountry, startTime, endTime, restType],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("Restaurant added successfully");
            }
        }
    );
});





// get restaurant
router.get('/', (req, res) => {
    console.log(req.query);
    console.log("Request Reached! GEt")
    const restEmail = req.query.restEmail;
    const restPass = req.query.restPass;
    const isOwner = req.query.isOwner;

    if(isOwner)
{
    db.query(
        "SELECT * FROM Restaurant WHERE RestEmail = ?",
        [ restEmail],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log({err : err});
                res.send("SQL error, Check log for more details");
            } else {
                if(result){
                    console.log(result);
                    if (passwordHash.verify(restPass, result[0].RestPass)){
                    res.send(result[0]);}
                }else{
                    res.send("Wrong Email Id or Password!")
                }
            }
        }
    );
    }
});

module.exports = router;




// router.post('/restaurant', (req, res) => {
//     var hashedPassword = passwordHash.generate(req.body.password);
//     let sql = `CALL Restaurant_Owner_put('${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', '${req.body.email_id}', '${hashedPassword}', '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}');`;
  
//     pool.query(sql, (err, result) => {
//       if (err) {
//         res.writeHead(500, {
//           'Content-Type': 'text/plain'
//         });
//         res.end("Error in Data");
//       }
//       if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
//         res.writeHead(200, {
//           'Content-Type': 'text/plain'
//         });
//         res.end(result[0][0].status);
//       }
//       else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
//         res.writeHead(401, {
//           'Content-Type': 'text/plain'
//         });
//         res.end(result[0][0].status);
//       }
//     });
//   });