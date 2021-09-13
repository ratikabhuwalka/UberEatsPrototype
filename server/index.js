const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

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
    const cuisineType = req.body.cuisineType;

    db.query(
        "INSERT INTO Restaurant (RestName, RestEmail, RestPass, RestPhone, RestCity, RestCountry, StartTime, EndTime, RestType, CuisineType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [restName, restEmail, restPass, restPhone, restCity, restCountry, startTime, endTime, restType, cuisineType],
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







app.listen(3000, ()=> {
    console.log("App running on 3000");
});