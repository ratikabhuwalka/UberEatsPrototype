const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// Create Schema

const UserSchema = new Schema(
  {
    u_id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    phoneNumber: {
      type: String,
    },
    defaultCurrency: {
      type: String,
    },
    timeZone: {
      type: String,
    },
    language: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
