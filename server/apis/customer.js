const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db_config.js');

//const pool = require('../pool.js');

// get customer
router.get('/', (req, res) => {
    const custEmail = req.query.email_id;
    const custPass = req.query.password;
    const isOwner = req.query.is_owner;


    db.query(
        "SELECT * FROM Customer WHERE CustEmail = ?",
        [ custEmail],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log({err : err});
                res.send("SQL error, Check log for more details");
            } else {
                if(result){
                    console.log(result);
                    if (passwordHash.verify(custPass, result[0].CustPass)){
                    res.send(result[0]);}
                    else{
                        res.send("INCORRECT PASSWORD")
                    }
                }else{
                    res.send("User not found")
                }
            }
        }
    );
    }
);

// create new Customer
router.post('/', (req, res) => {
    console.log("Request reached!");
    const CustName = req.body.CustName;
    const CustEmail = req.body.CustEmail;
    const CustPass = passwordHash.generate(req.body.CustPass);
    const CustPhone = req.body.CustPhone;
    const CustCity = req.body.CustCity;
    const CustCountry = req.body.CustCountry;
    const DOB = req.body.DOB;

    var sql_query = "INSERT INTO Customer (CustName, CustEmail, CustPass, CustPhone, CustCity, CustCountry, DOB) VALUES (?, ?, ?, ?, ?, ?, ?)"
    db.query(sql_query, [CustName, CustEmail, CustPass, CustPhone, CustCity, CustCountry, DOB],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("CUSTOMER ADDED");
            }
        }
    );

});

//Customer search
router.get('/getCustomers/:search_string?', (req, res) => {
    if(!req.query.search_string){
        var sql_query = "SELECT DISTINCT \
        r.CustId, r.CustName, r.CustEmail, r.CustCity, r.CustPhone, r.StartTime, r.EndTime\
        FROM Customer r \
        LEFT OUTER JOIN Dish d \
        ON d.CustId = r.CustId \
       ;"    
    }
    else{
        const search_string = '%' + req.query.search_string + '%'
        var sql_query = `SELECT DISTINCT \
        r.CustId, r.CustName, r.CustEmail, r.CustCity, r.CustPhone, r.StartTime, r.EndTime\        
        FROM Customer r \
        LEFT OUTER JOIN Dish d \
        ON d.CustId = r.CustId \
        WHERE (d.DishName LIKE '${search_string}' \
        OR d.Description LIKE '${search_string}' \
        OR r.CustName LIKE '${search_string}' \
        OR r.CustCity LIKE '${search_string}' );`
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


// get Customer
router.get('/', (req, res) => {
    const CustEmail = req.query.email_id;
    const CustPass = req.query.password;
    const isOwner = req.query.is_owner;

    if(isOwner)
{
    db.query(
        "SELECT * FROM Customer WHERE CustEmail = ?",
        [ CustEmail],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log({err : err});
                res.send("SQL error, Check log for more details");
            } else {
                if(result){
                    console.log(result);
                    if (passwordHash.verify(CustPass, result[0].CustPass)){
                    res.send(result[0]);}
                }else{
                    res.send("Wrong Email Id or Password!")
                }
            }
        }
    );
    }
});


router.get('/getItems/:Cust_id?', (req, res) => {

    var sql_query = `SELECT * \
    FROM Dish  \
    Where CustId = ${req.query.Cust_id}\
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




// router.post('/Customer', (req, res) => {
//     var hashedPassword = passwordHash.generate(req.body.password);
//     let sql = `CALL Customer_Owner_put('${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', '${req.body.email_id}', '${hashedPassword}', '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}');`;
  
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