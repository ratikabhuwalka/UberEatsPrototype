const Order = require("../../models/Order");

async function handle_request(msg, callback) { 
    try {
        console.log("place order request", msg);

        const { custId, restId,custName, restName, status, 
            total, discount, delivery, tax, cartItems, deliveryAddress,
             time, final, orderType, instruction }= msg;
        // For single Rest order place:
        let order_items = [];

        if(cartItems.length > 0 && cartItems[0]){

            const cart_items = cartItems;
            for( dish of cart_items){
            order_items.push({
                DishId : dish._id,
                DishName : dish.DishName,
                Description : dish.Description,
                Subtotal : dish.DishQuantity * dish.DishPrice,
                Quantity : dish.DishQuantity,
                Price : dish.DishPrice, 
                Category : dish.Category,
                Ingredients : dish.Ingredients,
            })
        }
        }
        

        let orderPayload = {
            RestId: restId,
            RestName: restName,
            CustId: custId,
            CustName: custName,
            Timestamp: time,
            OrderType : orderType,
            Address: deliveryAddress,
            Delivery: delivery,
            Tax: tax,
            Discount: discount,
            Instruction: instruction,
            Total: total,
            Final: final,
            Status: status,
            OrderItem: order_items,
        }

        const order = new Order({...orderPayload}); 
        const savedOrder = await order.save()
        console.log("place order response", savedOrder)
        callback(null, {status_code: 200, response: savedOrder});
        return;
    } catch(error) {
        console.log(error);
        // return res.status(500).json(error);
        callback(null, {status_code: 500, response: error});
        return;
    }

}

exports.handle_request = handle_request;
