const express = require("express");
const mongoose = require("mongoose");

const mongo = require("./config/keys").mongoDB;

require("./config/passport")
mongoose
  .connect(
    mongo,
    {
      poolSize: 500,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongo connected........");
  })
  .catch((err) => console.log(err));

var connection = new require("./kafka/Connection");

var addRestaurant = require("./services/Restaurant/addRestaurant")
var loginRestaurant = require("./services/Restaurant/loginRestaurant")
var getRestaurantId = require("./services/Restaurant/getRestaurantId")
var getRestaurantAll = require("./services/Restaurant/getRestaurantAll")
var updateRestaurant = require("./services/Restaurant/updateRestaurant")
var addDish = require("./services/Restaurant/addDish")
var updateDish = require("./services/Restaurant/updateDish")
var getRestOrders = require("./services/Restaurant/getRestaurantOrders")

//Customer apis

var addCustomer = require("./services/Customer/addCustomer")
var loginCustomer = require("./services/Customer/loginCustomer")
var placeOrder = require("./services/Customer/placeOrder")
var getCustOrders = require("./services/Customer/getCustomerOrder")
var getOrderReceipt = require("./services/Customer/getOrderReceipt")
var getCustomerId = require("./services/Customer/getCustomerId")
var updateCustomer = require("./services/Customer/updateCustomer")
var addFavourite = require("./services/Customer/addFavourite")
var getFavourite = require("./services/Customer/getFavourite")

// var getProfile = require("./services/getProfile");
// var updateProfile = require("./services/updateProfile");

// var getInvitesMygroup = require("./services/MyGroup/getInvitesMygroup");
// var getJoinedMygroup = require("./services/MyGroup/getJoinedMygroups");
// var joinGroup = require("./services/MyGroup/joinGroupMygroup");
// var getGroup = require("./services/MyGroup/getGroupsMygroup");
// var leaveGroup = require("./services/MyGroup/leaveGroup");

// var userDefaultCurrency = require("./services/Group/userDetails");
// var groupExpense = require("./services/Group/groupExpense");
// var oweDetails = require("./services/Group/oweDetails");
// var addExpense = require("./services/Group/addExpense");
// var addComment = require("./services/Group/addComment");
// var deleteComment = require("./services/Group/deleteComment");

// var getName = require("./services/CreateGroup/getName");
// var getEmail = require("./services/CreateGroup/getEmail");
// var CreateGroup = require("./services/CreateGroup/create");

// var getIds = require("./services/Dashboard/getIDs");
// var getNames = require("./services/Dashboard/getNames");
// var getOwe = require("./services/Dashboard/getOwe");
// var getTotalGet = require("./services/Dashboard/getTotalGet");
// var getSettlePerson = require("./services/Dashboard/getPerson");
// var settle = require("./services/Dashboard/settle");

// var groupNames = require("./services/RecentActivity/groupNames");
// var activity = require("./services/RecentActivity/recentActivity");

// var login = require("./services/user/login");
// var signup = require("./services/user/signup");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
    console.log("in handle topic req");
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function (message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);

      fname.handle_request(data.data, function (err, res) {
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        // console.log("payload created")
        // console.log(payloads)
        producer.send(payloads, function (err, data) {
          console.log(data);
        });
      return;
    });
  });
}

handleTopicRequest("add_restaurant", addRestaurant);
handleTopicRequest("login_restaurant", loginRestaurant);
handleTopicRequest("get_restaurant_id", getRestaurantId);
handleTopicRequest("get_restaurant_all", getRestaurantAll);
handleTopicRequest("add_dish", addDish);
handleTopicRequest("update_restaurant", updateRestaurant);
handleTopicRequest("update_dish", updateDish);
handleTopicRequest("add_customer", addCustomer);
handleTopicRequest("login_customer", loginCustomer);
handleTopicRequest("place_order", placeOrder);
handleTopicRequest("get_cust_order", getCustOrders);
handleTopicRequest("get_order_receipt", getOrderReceipt);
handleTopicRequest("get_rest_order", getRestOrders);
handleTopicRequest("get_customer_id", getCustomerId);
handleTopicRequest("update_customer", updateCustomer);
handleTopicRequest("add_favourite", addFavourite);
handleTopicRequest("get_favourite", getFavourite);


// handleTopicRequest("get_profile", getProfile);
// handleTopicRequest("update_profile", updateProfile);

// handleTopicRequest("get_invites", getInvitesMygroup);
// handleTopicRequest("get_joined", getJoinedMygroup);
// handleTopicRequest("join_group", joinGroup);
// handleTopicRequest("get_groups", getGroup);
// handleTopicRequest("leave_group", leaveGroup);

// handleTopicRequest("user_details", userDefaultCurrency);
// handleTopicRequest("group_expense", groupExpense);
// handleTopicRequest("owe_details", oweDetails);
// handleTopicRequest("add_expense", addExpense);
// handleTopicRequest("add_comment", addComment);
// handleTopicRequest("delete_comment", deleteComment);

// handleTopicRequest("get_Name", getName);
// handleTopicRequest("get_email", getEmail);
// handleTopicRequest("create_group", CreateGroup);

// handleTopicRequest("get_ids", getIds);
// handleTopicRequest("get_names", getNames);
// handleTopicRequest("get_owe", getOwe);
// handleTopicRequest("get_totalGet", getTotalGet);
// handleTopicRequest("get_person", getSettlePerson);
// handleTopicRequest("post_settle", settle);

// handleTopicRequest("get_gnames", groupNames);
// handleTopicRequest("get_activity", activity);

// handleTopicRequest("login", login);
// handleTopicRequest("signup", signup);

// app.listen(3002, () => {
//     console.log("running on the port 3002");
//   });
//  module.exports = app;

