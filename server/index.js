const app = require('./app');




const restaurant = require("./apis/restaurant");
const customer = require("./apis/customer");

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
// app.use("/grubhub/profile", profile);
// app.use("/grubhub/restaurant", restaurant);
// app.use("/grubhub/images", images);
// app.use("/grubhub/uploads", uploads);
// app.use("/grubhub/menu", menusections);
// app.use("/grubhub/menu", menuitems);
// app.use("/grubhub/cart", cart);
// app.use("/grubhub/orders", orders);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
