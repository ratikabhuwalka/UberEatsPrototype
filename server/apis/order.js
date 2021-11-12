const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../../kafka-backend/config/keys.js');
const moment = require('moment');
var kafka = require("../kafka/client");

const { response } = require("express");

router.post('/', (req, res) =>
{

});
// create new restaurant
router.post('/placeorder', (req, res) => {
    try{
    console.log("Place Order Request reached!");
    const time = moment().format('MMMM DD YYYY, hh:mma')

    var data = {
    custId : req.body.custId,
    restId : req.body.restId,
    custName : req.body.custName,
    restName : req.body.restName,
    status : req.body.status,    
    total : req.body.total,
    discount : req.body.discount,
    delivery : req.body.delivery,
    deliveryAddress : req.body.deliveryAddress,
    tax : req.body.tax,
    final : req.body.final,
    orderType : req.body.orderType,
    instruction : req.body.instruction,
    cartItems : req.body.cartItems,
    time : time

    }
   
    kafka.make_request("place_order", data, function (err, results) {
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

    // var sql_query = "INSERT INTO Orders (CustId, RestId, Status, Total,Discount, Delivery, Tax, Final, Timestamp, OrderType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // db.query(sql_query, [custId, restId, status,total, discount, delivery, tax, final, time, orderType],
    //     (err, result) => {
    //         if (err) {
    //             res.status(500);
    //             console.log(err);
    //             res.send("SQL error, Check log for more details");
    //         } else {
    //             let order_id = result.insertId;
    //             for(item of cartItems){
    //                 var sql_query = "INSERT INTO OrderItem (OrderId, DishId, Quantity) VALUES (?, ?, ?)"
    //                 db.query(sql_query, [order_id, item.DishId, item.DishQuantity], 
    //                     (err, result_) => {
    //                         if (err){
    //                             res.status(500);
    //                             console.log(err);
    //                         } 
    //                     }
    //                 );
    //             }

    //             res.status(200);
    //             res.send("ORDER PLACED");
    //         }
    //     }
    // );

});

router.get('/getcustorders', (req, res) =>
{
    try{
        data = req.query;

     kafka.make_request("get_cust_order", data, function (err, results) {
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

router.get('/getorderreceipt', (req, res) =>
{
    try{
        data = req.query;

     kafka.make_request("get_order_receipt", data, function (err, results) {
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


router.get('/getrestorders', (req, res) =>
{
    try{
        data = req.query;

     kafka.make_request("get_rest_order", data, function (err, results) {
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
    
    // if(req.query.rest_id){
    //     rest_id=req.query.rest_id;
        
    //     let ordersql = `select * from Orders \
    //     Inner Join Customer \
    //     on Orders.CustId= Customer.CustId \
    //     where RestId = ${rest_id};`

    //     db.query(ordersql, (err, result) =>
    //     {
    //         if(err){
    //             res.status(500);
    //             res.send("Cant Fetch");
    //         } 
    //         else{
    //             res.status(200);
    //             res.send(result)
    //         }   
    //     }
    //     );

    // }
    // else{
    // }
});

//TODO:
router.put('/updateorderstatus', (req, res)=>{

    try{
        data = req.body;
        console.log("request received in server:", data);
     kafka.make_request("update_order_status", data, function (err, results) {
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
   
    // console.log("Update Order Request reached!", req.body);
    // db.query("UPDATE Orders SET Status = ? WHERE OrderId = ?;",
    // [ req.body.status, req.body.order_id],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.status(500);
    //             res.send("SQL error, Check log for more details");
    //         } else {
    //             res.status(200);
    //             res.send("DISH UPDATED");
    //         }
    //     }
    // );

});




module.exports = router;

