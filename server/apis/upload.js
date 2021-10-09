const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db_config.js');

// const userstorage = multer.diskStorage({
//     destination: path.join(__dirname, '..') + '/public/uploads/users',
//     filename: (req, file, cb) => {
//         cb(null, 'user' + req.params.user_id + "-" + Date.now() + path.extname(file.originalname));
//     }
// });

// const useruploads = multer({
//     storage: userstorage,
//     limits: { fileSize: 1000000 },
// }).single("image");

// router.post("/user/:user_id", (req, res) => {
//     useruploads(req, res, function (err) {
//         if (!err) {
//             let imageSql = `UPDATE users SET user_image = '${req.file.filename}' WHERE user_id = ${req.params.user_id}`;
//             pool.query(imageSql, (err, result) => {
//                 if (err) {
//                     res.writeHead(500, {
//                         'Content-Type': 'text/plain'
//                     });
//                     res.end("Database Error");
//                 }
//             });
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             });
//             res.end(req.file.filename);
//         }
//         else {
//             console.log('Error!');
//         }
//     })
// });

// const resstorage = multer.diskStorage({
//     destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
//     filename: (req, file, cb) => {
//         cb(null, 'restaurant' + req.params.res_id + "-" + Date.now() + path.extname(file.originalname));
//     }
// });

// const resuploads = multer({
//     storage: resstorage,
//     limits: { fileSize: 1000000 },
// }).single("resimage");

// router.post("/restaurant/:res_id", (req, res) => {
//     resuploads(req, res, function (err) {
//         if (!err) {
//             let imageSql = `UPDATE restaurants SET res_image = '${req.file.filename}' WHERE res_id = ${req.params.res_id}`;
//             pool.query(imageSql, (err, result) => {
//                 if (err) {
//                     res.writeHead(500, {
//                         'Content-Type': 'text/plain'
//                     });
//                     res.end("Database Error");
//                 }
//             });
//             res.writeHead(200, {
//                 'Context-Type': 'text/plain'
//             });
//             res.end(req.file.filename);
//         }
//         else {
//             console.log('Error!');
//         }
//     })
// });

const dishstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/dishes',
    filename: (req, file, cb) => {
        cb(null, "dish-" + Date.now() + path.extname(file.originalname));
    }
});

const dishuploads = multer({
    storage: dishstorage,
    limits: { fileSize: 1000000 },
}).single("dish_image");

router.post("/dish/:dish_id", (req, res) => {
    dishuploads(req, res, function (err) {
        if (!err) {
            if (req.params.dish_id !== "undefined") {
                let imageSql = `UPDATE Dish SET DishImage = '${req.file.filename}' WHERE DishId= '1'`;

                db.query(imageSql, (err,result,fields)=>{
                    if(err){
                      console.log(err);
                      res.send(err)
                    }
                    else{
                      console.log("update successful");
                      res.send("done");
                    }
                  });
                }
        }});
    });

module.exports = router;