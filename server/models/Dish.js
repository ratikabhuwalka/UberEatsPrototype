const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  DishId: {
        type: String,
        required: [true, "Please enter the name of the dish"]
      },
  DishName: {
    type: String,
    required: [true, "Please enter the name of the dish"]
  },
  Price: {
    type: Number,
    required: [true, "Please enter the price of the dish"]
  },
  MealType: {
    type: String
  },
  Description: {
    type: String,
    required: [true, "Please provide description about the dish"]
  },
  Category: {
    type: String,
    required: [true, "Please provide description about the dish"]
  },
  DishImage : {
      type: String,
  }
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;