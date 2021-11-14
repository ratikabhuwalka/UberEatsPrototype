const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");


const customerSchema = new Schema({
   
    CustName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    CustEmail: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
      },
    CustPass:{
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8 
    }, 
    CustPhone: {
        type: Number,
        required: [true, "Please enter the contact number of the restaurant"]
      },  
    DOB: { 
        type: String, 
        trim: true 
    },
    CustImage: {
        type: String,
        default: ''
    },
    CustCity: {
        type: String,
        required: [true, "Please enter your city"]
    },
    CustCountry: {
        type: String,
        default: "USA"
    },
    
    //TODO:
    Favourites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    }],
    DeliveryAdds:[
        {
            Name: {
                type: String,
            },
            Address: {
                type: String, 
                trim: true
            },
            Contact:{
                type: Number,
                trim: true
            }
        }
    ],
    Orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }]
},
{ 
    versionKey: false 
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
