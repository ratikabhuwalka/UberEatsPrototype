const express = require("express");
const router = express.Router();
//const pool = require('../pool.js');
const path = require('path');
const fs = require('fs');


router.get('/dish/:user_image', (req, res) => {

    console.log(req);
    var image = path.join(__dirname, '..') + '/public/uploads/dishes/' + req.params.user_image;
    if (fs.existsSync(image)) {
        console.log(image);
        res.sendFile(image);

    }
    else {
        console.log("In else");
        res.send("file not found!")
        //res.sendFile(path.join(__dirname, '..') + '/public/uploads/users/userplaceholder.jpg')
    }
});
module.exports = router;