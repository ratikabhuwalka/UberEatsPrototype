   
const mongoose = require("mongoose");
const validator = require("validator")

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
    minlength: 8,
    select: false
  },

  Dishes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Dish"
    }
  ] 
},
{
    versionKey: false
},
{
    collection: 'Restaurant'
});

restaurantSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
      }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;