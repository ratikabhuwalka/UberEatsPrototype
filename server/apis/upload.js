const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../../kafka-backend/config/keys.js');
const multiparty = require('multiparty');
const fileType = require('file-type')
const uploadFile = require('../../kafka-backend/config/s3_config');


router.post("/restaurant/:rest_id", async (req, res) => {
    const rest_id = req.params.rest_id;
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send(error);
      }
      try {
        console.log(form.file)
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const fileName = `restaurantImages/${rest_id}`;
        const data = await uploadFile(buffer, fileName, type);
        console.log("Success: ", data);
        if(data){
          var sql = "Update Restaurant \
                     Set RestImage = ?\
                     Where RestId = ?";
          db.query(sql,[data.Location, rest_id],
                 (err,result)=>{
                    if(err){
                      console.log(err);
                    }
                    else{
                      console.log("update successful");
                    }
            });
        }
        return res.status(200).send(data);
      } catch (err) {
        console.log("Upload Error: ", err);
        return res.status(500).send(err);
      }
    });
  });



  router.post("/dish/:dish_id", async (req, res) => {
    const dish_id = req.params.dish_id;
    console.log("dish_id:",dish_id )
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send(error);
      }
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const fileName = `dishImages/${dish_id}`;
        const data = await uploadFile(buffer, fileName, type);
        console.log("Success: ", data);
        if(data){
          var sql = "Update Dish \
                     Set DishImage = ?\
                     Where DishId = ?";
          db.query(sql,[data.Location, dish_id],
                 (err,result)=>{
                    if(err){
                      console.log(err);
                    }
                    else{
                      console.log("update successful");
                    }
            });
        }
        return res.status(200).send(data);
      } catch (err) {
        console.log("Upload Error: ", err);
        return res.status(500).send(err);
      }
    });
  });
 
module.exports = router;