const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var membersInfo  = mongoose.Schema({
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    is_accepted:{
        type: Number,
        default: 0,
    }
})