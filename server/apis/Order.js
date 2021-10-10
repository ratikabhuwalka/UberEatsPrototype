const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db_config.js');
const moment = require('moment');
const { response } = require("express");

router.post('/', (req, res) =>
{

});
// create new restaurant
router.post('/placeorder', (req, res) => {
    console.log("Place Order Request reached!");
    const custId = req.body.custId;
    const restId = req.body.restId;
    const status = req.body.status;    
    const total = req.body.total;
    const discount = req.body.discount;
    const delivery = req.body.delivery;
    const tax = req.body.tax;
    const final = req.body.final;
    const orderType = req.body.orderType;
    const cartItems = JSON.parse(req.body.cart_items);
    const time = moment().format('MMMM DD YYYY, hh:mma')
    console.log(time);
    var sql_query = "INSERT INTO Orders (CustId, RestId, Status, Total,Discount, Delivery, Tax, Final, Timestamp, OrderType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql_query, [custId, restId, status,total, discount, delivery, tax, final, time, orderType],
        (err, result) => {
            if (err) {
                res.status(500);
                console.log(err);
                res.send("SQL error, Check log for more details");
            } else {
                let order_id = result.insertId;
                for(item of cartItems){
                    var sql_query = "INSERT INTO OrderItem (OrderId, DishId, Quantity) VALUES (?, ?, ?)"
                    db.query(sql_query, [order_id, item.DishId, item.DishQuantity], 
                        (err, result_) => {
                            if (err){
                                res.status(500);
                                console.log(err);
                            } 
                        }
                    );

                }

                res.status(200);
                res.send("ORDER PLACED");
            }
        }
    );

});

router.get('/getcustorders', (req, res) =>
{
    let cust_id = ''
    if(req.query.cust_id){
        cust_id=req.query.cust_id;
        
        let ordersql = `select * from Orders \
        Inner Join Restaurant \
        on Orders.RestId= Restaurant.RestId \
        where CustId = ${cust_id};`

        db.query(ordersql, (err, result) =>
        {
            if(err){
                res.status(500);
                res.send("Cant Fetch");
            } 
            else{
                res.status(200);
                res.send(result)
            }   
        }
        );

    }
    else{
    }
});

router.get('/getorderreceipt', (req, res) =>
{
    let order_id = ''
    if(req.query.order_id){
        order_id=req.query.order_id;
        
        let receiptsql = `select * from Orders \
        Inner Join OrderItem \
        on Orders.OrderId= OrderItem.OrderId \
        Inner Join Dish\
        on OrderItem.DishId = Dish.DishId
        where Orders.OrderId = ${order_id};`

        db.query(receiptsql, (err, result) =>
        {
            if(err){
                res.status(500);
                res.send("Cant Fetch");
            } 
            else{
                res.status(200);
                res.send(result)
            }   
        }
        );

    }
    else{
    }
});


router.get('/getrestorders', (req, res) =>
{
    let rest_id = ''
    if(req.query.rest_id){
        rest_id=req.query.rest_id;
        
        let ordersql = `select * from Orders \
        Inner Join Customer \
        on Orders.CustId= Customer.CustId \
        where RestId = ${rest_id};`

        db.query(ordersql, (err, result) =>
        {
            if(err){
                res.status(500);
                res.send("Cant Fetch");
            } 
            else{
                res.status(200);
                res.send(result)
            }   
        }
        );

    }
    else{
    }
});

router.put('/updateorderstatus', (req, res)=>{
    console.log("Update Order Request reached!", req.body);
    db.query("UPDATE Orders SET Status = ? WHERE OrderId = ?;",
    [ req.body.status, req.body.order_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send("SQL error, Check log for more details");
            } else {
                res.status(200);
                res.send("DISH UPDATED");
            }
        }
    );

});




module.exports = router;

