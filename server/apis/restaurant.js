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
                res.send("RESTAURANT ADDED");
            }
        }
    );

});



//Restaurant by id
router.get('/getRestaurant/:rest_id?', (req, res) => {
    let rest_id = req.query.rest_id
    var sql_query = `SELECT * \
        FROM Restaurant r \
        WHERE RestId = ${rest_id}\
       ;`   
    
    db.query(sql_query, 
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.send(result);
                res.status(200);
            }
        }
    );
});


//Restaurant search
router.get('/getRestaurants/:search_string?', (req, res) => {
    if(!req.query.search_string){
        var sql_query = "SELECT DISTINCT \
        r.RestId, r.RestName, r.RestEmail, r.RestCity, r.RestPhone, r.StartTime, r.EndTime\
        FROM Restaurant r \
        LEFT OUTER JOIN Dish d \
        ON d.RestId = r.RestId \
       ;"    
    }
    else{
        const search_string = '%' + req.query.search_string + '%'
        var sql_query = `SELECT DISTINCT \
        r.RestId, r.RestName, r.RestEmail, r.RestCity, r.RestPhone, r.StartTime, r.EndTime\        
        FROM Restaurant r \
        LEFT OUTER JOIN Dish d \
        ON d.RestId = r.RestId \
        WHERE (d.DishName LIKE '${search_string}' \
        OR d.Description LIKE '${search_string}' \
        OR r.RestName LIKE '${search_string}' \
        OR r.RestCity LIKE '${search_string}' );`
    }
    
    db.query(sql_query, 
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.send(result)
                res.status(200);
                
            }
        }
    );
});


// get restaurant
router.get('/', (req, res) => {
    const restEmail = req.query.email_id;
    const restPass = req.query.password;
    const isOwner = req.query.is_owner;

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


router.get('/getItems/:rest_id?', (req, res) => {

    var sql_query = `SELECT * \
    FROM Dish  \
    Where RestId = ${req.query.rest_id}\
    ;`    
    db.query(sql_query, 
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.send(result)
                res.status(200);
                
            }
        }
    );
});


router.post('/addFav', (req, res) => {
    const cust_id = req.body.cust_id;
    const rest_id = req.body.rest_id;

    var sql_query = "INSERT INTO Favourites (RestId, CustId) VALUES (?, ?)"
    db.query(sql_query, [rest_id, cust_id],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("Favourite added successfully");
            }
        }
    );

});

router.get('/getFav/:cust_id?', (req, res) => {

    var sql_query = `SELECT r.RestId , r.RestName, r.RestPhone, r.StartTime, r.EndTime  \
    FROM Favourites f  \
    INNER JOIN Restaurant r\
    ON f.RestId = r.RestId
    Where CustId = ${req.query.cust_id}\
    ;`    
    db.query(sql_query, 
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.send(result)
                res.status(200);
                
            }
        }
    );
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