// const mongoose = require("mongoose");

// const dishSchema = new mongoose.Schema({
//   DishName: {
//     type: String,
//     required: [true, "Please enter the name of the dish"]
//   },
//   Price: {
//     type: Number,
//     required: [true, "Please enter the price of the dish"]
//   },
//   Ingredients: {
//     type: String,
//   },
//   MealType: {
//     type: String
//   },
//   Description: {
//     type: String,
//     required: [true, "Please provide description about the dish"]
//   },
//   Category: {
//     type: String,
//     required: [true, "Please provide description about the dish"]
//   },
//   DishImage : {
//       type: String,
//   },
//   RestId : {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Restaurant"
// }

// });

// const Dish = mongoose.model("Dish", dishSchema);

// module.exports = Dish;