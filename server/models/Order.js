const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// const orderItemSchema = new Schema({
//     res_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Restaurant"
//     },
//     res_menu_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Dish"
//     },
//     dish_name: String,
//     description: String,
//     quantity: { type: Number, default: 1 },
//     dish_price: { type: Number }, 
//     dish_category: {type: String, required: true},
//     food_type: {type: Number},

// },
// { 
//     versionKey: false 
// });

const orderSchema = new Schema({
    RestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    CustId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    RestName: {type: String},
    CustName : {type: String},
    Timestamp: { type: String, required: true},
    OrderType: { type: String, default: "Delivery"},
    Address: { type: String},
    Delivery: { type: Number, default: 0},
    Tax: { type: Number, default: 0},
    Discount: { type: Number, default: 0},
    Instruction: { type: String},
    Total: { type: Number, default: 0},
    Final: { type: Number, default: 0},
    Status : { type: String, default: "New"},
    OrderItem: [{
        DishId: {type: mongoose.Schema.Types.ObjectId,
                    ref : "Dish"},
        DishName: {type: String},
        Description : {type : String},
        Subtotal: {type: Number, default:0},
        Quantity: { type: Number, default: 0},
        Category: { type: String},
        Ingredients : { type: String},
        Price : { type: Number }        
    }]
},
{ 
    versionKey: false 
});

const Order = mongoose.model("Order", orderSchema);
// export const OrderItem = mongoose.model("OrderItem", orderItemSchema);

// export default Order;
module.exports = Order;

