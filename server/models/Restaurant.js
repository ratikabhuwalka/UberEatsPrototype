   
const mongoose = require("mongoose");
const validator = require("validator");


const dishSchema = new mongoose.Schema({
  DishName: {
    type: String,
    required: [true, "Please enter the name of the dish"]
  },
  Price: {
    type: Number,
    required: [true, "Please enter the price of the dish"]
  },
  Ingredients: {
    type: String,
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
  },
  RestId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
}

});

const restaurantSchema = new mongoose.Schema({
  // RestId: {
  //     type: String,
  //     required : true
  // },
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
  RestEmail: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  RestPass:{
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8 
  },

  Dishes: [dishSchema] 
},
{
    versionKey: false
},
{
    collection: 'Restaurant'
});

// restaurantSchema.pre("save", async function (next) {
//     if (!this.isModified("RestPass")) {
//         return next();
//       }
//     this.RestPass = await bcrypt.hash(this.RestPass, 12);
//     next();
// });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const Dish = mongoose.model("Dish", dishSchema);
module.exports = {Restaurant: Restaurant, 
                  Dish: Dish};