const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../../kafka-backend/config/keys.js');
var kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");
const { auth } = require("../config/passport");
auth();



router.post('/adddish', checkAuth, (req, res) => {
    try{
    console.log("Add new Dish Request reached!");
    var data = {
        dishName : req.body.dishName,
        ingredients : req.body.ingredients,
        price : req.body.price,
        description : req.body.description,
        category : req.body.category,
        restId : req.body.restId,
        mealType : req.body.mealType,
        dishImage : "",
    }
   
    kafka.make_request("add_dish", data, function (err, results) {
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
   
   
   
    // const dishName = req.body.dishName;
    // const ingredients = req.body.ingredients;
    // const price = req.body.price;
    // const description = req.body.description;
    // const category = req.body.category;
    // const restId = req.body.restId;
    // const mealType = req.body.mealType;
    // var sql_query = "INSERT INTO Dish (dishName, ingredients,  price,description, category, restId, mealType) VALUES (?, ?, ?, ?, ?, ?, ?)";
    // db.query(sql_query, [dishName, ingredients, price, description, category, restId, mealType],
    //     (err, result) => {
    //         if (err) {
    //             res.status(500);
    //             res.send("SQL error, Check log for more details");
    //         } else {
    //             res.status(200);
    //             res.send("DISH ADDED");
    //         }
    //     }
    // );

});

router.get('/getdish', checkAuth, (req, res) =>
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

router.post('/updatedish', checkAuth, (req, res) => {
    try
    {
        const data =
        {
            dishId : req.body.dishId,
            dishName : req.body.dishName,
            ingredients : req.body.ingredients,
            price : req.body.price,
            description : req.body.description,
            category : req.body.category,
            mealType : req.body.mealType,
            dishImage : req.body.dishImage,
            restId : req.body.restId,
        }

    kafka.make_request("update_dish", data, function (err, results) {
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

//TODO:
router.delete('/deletedish', checkAuth, (req, res) => {

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
