const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../pool.js');

router.post('/', (req, res) => {
    let sql = "IF EXISTS(SELECT user_id FROM users WHERE email_id = _email_id) THEN \
		SELECT user_id, email_id, password, name, is_owner, address, phone_number, user_image, 1 AS status FROM users WHERE email_id = _email_id; \
    ELSE  \
		SELECT 0 AS status; \
	  END IF;;" 

    pool.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.send("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status) {
        if (passwordHash.verify(req.body.password, result[0][0].password)) {
          res.cookie('cookie', "admin", { maxAge: 90000000, httpOnly: false, path: '/' });
          req.session.user = req.body.email_id;
          let userObject = { user_id: result[0][0].user_id, name: result[0][0].name, email_id: result[0][0].email_id, is_owner: result[0][0].is_owner, address: result[0][0].address, phone_number: result[0][0].phone_number };
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(userObject));
        }
        else {
          res.writeHead(401, {
            'Content-Type': 'text/plain'
          });
          res.end("INCORRECT PASSWORD");
        }
      }
      else {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("NO USER");
      }
    });
  });

module.exports = router;