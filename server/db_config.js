const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'admin',
    host: 'uber-eats.cr6pm56ji8yd.us-east-2.rds.amazonaws.com',
    password: 'admin123',
    database: 'uber_eats_db'
});

module.exports = db;