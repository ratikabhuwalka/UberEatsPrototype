const mysql = require('mysql');

// const db = mysql.createConnection({
//     user: 'admin',
//     host: 'uber-eats.cr6pm56ji8yd.us-east-2.rds.amazonaws.com',
//     password: 'admin123',
//     database: 'uber_eats_db'
// });
const myPort = 3306;
const db = mysql.createPool({
    connectionLimit: 100,
    host: 'uber-eats.cr6pm56ji8yd.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'uber_eats_db'
});

db.getConnection((err) => {
    if(err){
      throw 'Error occured: ' + err;
    }
  });
  
module.exports = db;