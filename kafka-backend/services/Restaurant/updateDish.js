let {Restaurant} = require("../../models/Restaurant");
const mongoose = require("mongoose");

async function handle_request(msg, callback) { 
    try {
        const { dishId, dishName, ingredients, price,  description, category,restId, mealType, dishImage} = msg;
      
        const update = {
            DishName : dishName,
            Ingredients : ingredients,
            Price : price,
            Description : description,
            Category : category,
            MealType : mealType,
            DishImage : dishImage,
        }
        const rest = await Restaurant.findById(restId);
        let dish = rest.Dishes.id(mongoose.Types.ObjectId(dishId));
        dish.set({...update});
        let result = await rest.save();
        callback(null, {status_code: 200, response: { data: result, dish}});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}
exports.handle_request = handle_request;
