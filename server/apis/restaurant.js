const express = require("express");
const router = express.Router();
//const passwordHash = require('password-hash');
//const db = require('../../kafka-backend/config/keys.js');
var kafka = require("../kafka/client");

//const pool = require('../pool.js');


// create new restaurant
router.post('/', (req, res) => {
    console.log("Request reached!");
    var data = {
        restName : req.body.restName,
        restEmail : req.body.restEmail,
        restPass : req.body.restPass,
        restPhone : req.body.restPhone,
        restCity : req.body.restCity,
        restCountry : req.body.restCountry,
        startTime : req.body.startTime,
        endTime : req.body.endTime,
        restType : req.body.restType,
    };
   

    kafka.make_request("add_restaurant", data, function (err, results) {
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          console.log(results);
          if (results === "Restaurant Already Exists") {
            res.status(404).json({ msg: "Restaurant Exists" });
          } else {
            console.log("Inside router post");
            res.status(200).json({ msg: "Restaurant Created successfully" });
          }
        }
      });
    

});


// login restaurant
router.get('/', (req, res) => {
    try{
    var data = {
        restEmail : req.query.restEmail,
        restPass : req.query.restPass
    }
   
    kafka.make_request("login_restaurant", data, function (err, results) {
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {

            console.log("Inside router post");
            console.log(results);
            res.status(200).send(results);
        }
      });
    
    } catch(error){
        console.log("error:", error);
        return res.status(500).json(error);
    }
});


//Restaurant by id
router.get('/getRestaurant/:rest_id?', (req, res) => {
    
    try{

        var data = {
            rest_id : req.query.rest_id
        }
       
        kafka.make_request("get_restaurant_id", data, function (err, results) {
            if (err) {
              console.log("Inside err");
              res.json({
                status: "error",
                msg: "System Error, Try Again.",
              });
            } else {
                console.log("Inside router post");
                console.log(results);
                res.status(200).send(results);
            }
          });
        } catch(error){
            console.log("error:", error);
            return res.status(500).json(error);
     }
});


//Restaurant search
router.get('/getRestaurants', (req, res) => {
    // console.log(req);
    // if(!req.query.search_string){
    //     var sql_query = `SELECT DISTINCT \
    //     r.RestId, r.RestName, r.RestEmail, r.RestCity, r.RestPhone, r.StartTime, r.EndTime, r.RestType, r.RestImage\
    //     FROM Restaurant r \
    //     LEFT OUTER JOIN Dish d \
    //     ON d.RestId = r.RestId \
    //     ORDER BY FIELD(RestCity,'${req.query.cust_city}') Desc;`  
    // }
    // else{
    //     const search_string = '%' + req.query.search_string + '%'
    //     var sql_query = `SELECT DISTINCT \
    //     r.RestId, r.RestName, r.RestEmail, r.RestCity, r.RestPhone, r.StartTime, r.EndTime, r.RestType, r.RestImage\        
    //     FROM Restaurant r \
    //     LEFT OUTER JOIN Dish d \
    //     ON d.RestId = r.RestId \
    //     WHERE (d.DishName LIKE '${search_string}' \
    //     OR d.Description LIKE '${search_string}' \
    //     OR r.RestName LIKE '${search_string}' \
    //     OR r.RestCity LIKE '${search_string}' \
    //     OR d.Category LIKE '${search_string}' )\
    //     ORDER BY FIELD(RestCity,'${req.query.cust_city}'
    //     ) Desc;`
    // }
    
    // db.query(sql_query, 
    //     (err, result) => {
    //         if (err) {
    //             res.status(500);
    //             console.log(err);
    //             res.send("SQL error, Check log for more details");
    //         } else {
    //             res.send(result)
    //             res.status(200);
                
    //         }
    //     }
    // );


    try{
        search_string= ''
        if(req.query.search_string){
            search_string = req.query.search_string
        }
        var data = {
            search_string : search_string
        }
       
        kafka.make_request("get_restaurant_all", data, function (err, results) {
            if (err) {
              console.log("Inside err");
              res.json({
                status: "error",
                msg: "System Error, Try Again.",
              });
            } else {
                console.log("Inside router post");
                console.log(results);
                res.status(200).send(results);
            }
          });
        } catch(error){
            console.log("error:", error);
            return res.status(500).json(error);
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
    
    const rest_id = req.body.rest_id;
    const cust_id = req.body.cust_id;
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

    var sql_query = `SELECT r.RestId , r.RestName, r.RestPhone, r.StartTime, r.EndTime ,r.RestType, r.RestImage \
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


router.post('/updaterest', (req, res) => {


    const rest_id     = req.body.rest_id;
    const rest_country= req.body.rest_country;
    const rest_name   = req.body.rest_name;
    const rest_phone  = req.body.rest_phone;
    const rest_email  = req.body.rest_email;
    const rest_city   = req.body.rest_city;
    const start_time  = req.body.start_time;
    const end_time    = req.body.end_time;
    const rest_type   = req.body.rest_type;


    db.query("UPDATE Restaurant SET RestName = ?, RestCountry = ?, RestPhone =?, RestEmail=?, RestCity=?, StartTime =?, EndTime =?, RestType=? WHERE RestId = ?",
    [rest_name,rest_country,rest_phone,rest_email,rest_city,start_time, end_time, rest_type, rest_id],
        (err, result) => {
            if (err) {
                res.status(500);
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("RESTAURANT UPDATED");
            }
        }
    );

});

module.exports = router;
