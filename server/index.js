const app = require('./app');




const restaurant = require("./apis/restaurant");
const customer = require("./apis/customer");
const order = require("./apis/order");
const dish = require("./apis/dish")
// const profile = require("./routes/profile");
// const restaurant = require("./routes/restaurant");
// const images = require("./routes/images");
// const uploads = require("./routes/uploads");
// const menusections = require("./routes/menusections");
// const menuitems = require("./routes/menuitems");
// const cart = require("./routes/cart");
// const orders = require("./routes/orders");

app.use('/restaurant', restaurant);
app.use('/customer', customer);
app.use('/order', order);
app.use('/dish', dish)

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
