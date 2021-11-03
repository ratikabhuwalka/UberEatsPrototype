let Restaurant = require("../../models/Restaurant");
let Dish = require("../../models/Dish");


async function handle_request(msg, callback) {
    try {
        console.log("Inside add dish kafka backend");
        console.log(msg);
        const { dishName, ingredients, price,  description, category,restId, mealType, dishImage} = msg;
        const newDish = new Dish({
            DishName: dishName, 
            DishImage: dishImage, 
            Price: price, 
            Description: description, 
            Ingredients: ingredients, 
            Category: category, 
            MealType: mealType, 
            RestId: restId
        });
        const rest = await Restaurant.findOne({_id: restId});
        console.log("rest", rest);
        console.log("rest dishes", rest.Dishes);
        rest.Dishes.push(newDish);
        await rest.save();
        // TODO: Now complete res is set
        // return res.status(200).json({ data: r, dish: dishObj });
        callback(null, {status_code: 200, response: { data: rest, dish: newDish }});
        return;
    } catch(error) {
        console.log(error);
        // return res.status(500).json(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;