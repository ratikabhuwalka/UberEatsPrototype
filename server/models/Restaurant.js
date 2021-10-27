   
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  RestId: {
      type: String,
      required : true
    
  },
  RestName: {
    type: String,
    required: [true, "Please enter the name of the dish"]
  },
  RestCity: {
    type: String,
    required: [true, "Please enter the address of the restaurant"]
  },
  RestCountry: {
    type: String,
    default: "Multi-Cuisine"
  },
  RestType: {
      type: String,
      default: "Both"
  },
  StartTime: {
    type: String,
    required: [true, "Please provide description about the dish"]
  },
  EndTime: {
    type: String,
    required: [true, "Please provide description about the dish"]
  },
  RestPhone: {
    type: Number,
    required: [true, "Please enter the contact number of the restaurant"]
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  Dishes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Dish"
    }
  ]
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;