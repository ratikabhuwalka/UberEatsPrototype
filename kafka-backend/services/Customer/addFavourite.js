let {Restaurant} = require("../../models/Restaurant");
let Customer = require("../../models/Customer");


async function handle_request(msg, callback) {
    try {
        console.log("Inside add favourite kafka backend");
        console.log(msg);
        const { rest_id, cust_id} = msg;
        // const newDish = new Dish({
        //     DishName: dishName, 
        //     DishImage: dishImage, 
        //     Price: price, 
        //     Description: description, 
        //     Ingredients: ingredients, 
        //     Category: category, 
        //     MealType: mealType, 
        //     RestId: restId
        // });
        const cust = await Customer.findOne({_id: cust_id});
        console.log("cust", cust);
        console.log("cust favs", cust.Favourites);
        if( cust.Favourites.includes(rest_id)){
            callback(null, {status_code: 400, response: {msg: "Favourite already present"}}) 
        }
        else{
            cust.Favourites.push(rest_id);
            await cust.save();
            callback(null, {status_code: 200, response: { data: cust}});

        }
  
        // TODO: Now complete res is set
        // return res.status(200).json({ data: r, dish: dishObj });
        return;
    } catch(error) {
        console.log(error);
        // return res.status(500).json(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;