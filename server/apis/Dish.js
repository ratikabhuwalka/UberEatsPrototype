const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db_config.js');

router.post('/addnew', (req, res) => {
    console.log("Add new Dish Request reached!");
    const dishName = req.body.dishName;
    const ingredients = req.body.ingredients;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const restId = req.body.restId;
    const mealType = req.body.mealType;
    var sql_query = "INSERT INTO Dish (dishName, ingredients,  price,description, category, restId, mealType) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql_query, [dishName, ingredients, price, description, category, restId, mealType],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("DISH ADDED");
            }
        }
    );

});


module.exports = router;
