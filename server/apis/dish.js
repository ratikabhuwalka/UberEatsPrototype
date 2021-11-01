const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../../kafka-backend/config/keys.js');

router.post('/adddish', (req, res) => {
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
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("DISH ADDED");
            }
        }
    );

});

router.get('/getdish', (req, res) =>
{
    let dish_id = '';
    if(req.query.dish_id){
        dish_id=req.query.dish_id;
        
        let dishsql = `select * from Dish \
        where DishId = ${dish_id};`

        db.query(dishsql, (err, result) =>
        {
            if(err){
                res.status(500);
                res.send("Cant Fetch");
            } 
            else{
                console.log(res);
                res.status(200);
                res.send(result)
            }   
        }
        );

    }
    else{
    }
});

router.post('/updatedish', (req, res) => {

    console.log("update Dish Request reached!");
    const dishId = req.body.dishId;
    const dishName = req.body.dishName;
    const ingredients = req.body.ingredients;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const mealType = req.body.mealType;

    db.query("UPDATE Dish SET DishName = ?,category = ?,description =?,price=?,MealType=?, Ingredients =? WHERE DishId = ?",
    [dishName,category,description,price,mealType,ingredients, dishId],
        (err, result) => {
            if (err) {
                res.status(500);
                res.send("SQL error, Check log for more details");
            } else {
                console.log("entered else sending response")
                res.status(200);
                res.send("DISH UPDATED");
            }
        }
    );

});


router.delete('/deletedish', (req, res) => {

    console.log("Delete Dish Request reached!", req.body.dish_id);
    db.query("DELETE FROM Dish WHERE DishId = ?",
    [req.body.dish_id],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                console.log("entered else sending response")
                res.status(200);
                res.send("DISH DELETED");
            }
        }
    );

});

module.exports = router;
