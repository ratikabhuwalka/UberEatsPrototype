const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    fname: {type: String},
    lname: {type: String},
    usertype: {type: String}

},
{
    versionKey: false
});

module.exports = mongoose.model('users', usersSchema);