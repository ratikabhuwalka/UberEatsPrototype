const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const e = require("express");

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    user: 'admin',
    host: 'uber-eats.cr6pm56ji8yd.us-east-2.rds.amazonaws.com',
    password: 'admin123',
    database: 'uber_eats_db'
});

// create new restaurant
app.post('/restaurant', (req, res) => {
    const restName = req.body.restName;
    const restEmail = req.body.restEmail;
    const restPass = req.body.restPass;
    const restPhone = req.body.restPhone;
    const restCity = req.body.restCity;
    const restCountry = req.body.restCountry;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const restType = req.body.restType;

    db.query(
        "INSERT INTO Restaurant (RestName, RestEmail, RestPass, RestPhone, RestCity, RestCountry, StartTime, EndTime, RestType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [restName, restEmail, restPass, restPhone, restCity, restCountry, startTime, endTime, restType],
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

// create new restaurant
app.get('/restaurant', (req, res) => {
    const restEmail = req.query.restEmail;
    const restPass = req.query.restPass;

    db.query(
        "SELECT * FROM Restaurant WHERE RestEmail = ? AND RestPass = ?",
        [ restEmail, restPass],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log({err : err});
                res.send("SQL error, Check log for more details");
            } else {
                if(result){
                    res.send(result);
                }else{
                    res.send("Wrong Email Id or Password!")
                }
            }
        }
    );
});




app.listen(3001, ()=> {
    console.log("App running on 3001");
});