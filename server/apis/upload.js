const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');
const fileType = require('file-type')
const uploadFile = require('../config/s3_config');
var kafka = require("../kafka/client");

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
        const s3res = await uploadFile(buffer, fileName, type);
        console.log("Success: ", s3res);
        if(s3res){
          const data = {
            rest_id : rest_id,
            url : s3res.Location
          }
          kafka.make_request("upload_rest_image", data, function (err, results) {
            if (err) {
              console.log("Inside err");
              res.json({
                status: "error",
                msg: "System Error, Try Again.",
              });
            } else {
              console.log(results);
              if (results === "Restaurant Already Exists") {
                res.status(404).json({ msg: "Restaurant Exists" });
              } else {
                console.log("Inside router post");
                res.status(200).json({ msg: "Image Uploaded successfully" });
              }
            }
          });
        }
        else{
          rest.status(400).json({msg: "Image was not uploaded!"})
        }
      } catch (err) {
        console.log("Upload Error: ", err);
        return res.status(500).send(err);
      }
    });
  });



  router.post("/dish/:rest_id", async (req, res) => {
    const dish_id = req.query.dish_id
    const rest_id = req.query.rest_id
   
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      console.log('req', req)
      if (error) {
        return res.status(500).send(error);
      }
      try {
        const path = files.file[0].path;
        console.log("path", path);
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const fileName = `dishImages/${dish_id}`;
        const s3res = await uploadFile(buffer, fileName, type);
        console.log("Success: ", s3res);
        if(s3res){
          const data = {
            rest_id:rest_id,
            dish_id:dish_id
          }
          kafka.make_request("upload_dish_image", data, function (err, results) {
            if (err) {
              console.log("Inside err");
              res.json({
                status: "error",
                msg: "System Error, Try Again.",
              });
            } else {
              console.log(results);
              if (results === "Restaurant Already Exists") {
                res.status(404).json({ msg: "Restaurant Exists" });
              } else {
                console.log("Inside router post");
                res.status(200).json({ msg: "Image Uploaded successfully" });
              }
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