const Customer = require("../../models/Customer.js");
const {Restaurant} = require("../../models/Restaurant.js")
const Order = require("../../models/Order.js");
const jwt = require("jsonwebtoken");
const bcrypt =require('bcrypt');
const { secret_key } = require("../../config/keys")


const resolvers = {
    Query: {
        async getCustomer(parent, {custId}) {
            try {
                console.log(custId);
                const cust_id = custId;
                const cust = await Customer.findOne({_id: cust_id});
                return cust;
            } catch(error) {
                console.log(error);
                throw new Error(error)
            }
        },


        async getRestaurant(parent, {restId}) {
            try {
                const rest_id = restId;
                const rest = await Restaurant.findOne({_id: rest_id});
                return rest;
            } catch(error) {
                console.log(error);
                throw new Error(error)
            }
        },




        
       
    },
    Mutation: {

        async loginCustomer(_, { customerLoginInput }) {
            try {
                const { custEmail, custPass } = customerLoginInput;
                const result = await Customer.findOne({CustEmail : custEmail})
                if (!result) {
                    throw new Error("Invalid email");
          
                }
                const match = await bcrypt.compare(custPass, result.CustPass);
                if (!match) {
                    throw new Error("Invalid password");  
                }
                console.log("customer result", result)
                const payload = {
                    CustId: result._id,
                    CustName: result.CustName,
                    CustEmail: result.CustEmail,
                    CustCity : result.CustCity,
                    IsOwner: false
                    };
                const token = jwt.sign(payload, 'jwt_ubereats', {expiresIn: "2h"});
                return "JWT "+token;
               
            } catch(error) {
                console.log("======inside catch:");
                console.log("error==", error);
                throw new Error(error);
               
            }
        },



        async addCustomer(_, {customerInput}) {
            try {
                const { CustName, CustEmail, CustPass, CustCity, CustPhone } = customerInput;
                console.log("customer input", customerInput)
                var pass  = await bcrypt.hash(CustPass, 10);
            
             
                const cust = await Customer.findOne({ CustEmail: CustEmail });
                if (cust){
                    throw new Error('Email already in use')
                  } else {
                      console.log("in else")
                    const newCust = new Customer({
                      CustName: CustName,
                      CustEmail: CustEmail,
                      CustCity: CustCity,
                      CustPhone: CustPhone,
                      CustPass: pass,
        
                    })
            
                    await newCust.save();
                    console.log("customer", newCust);
                    return true
                  }
               
              } catch (error) {
                console.log(error);
                throw new Error(error)
              }
        },



        async loginRestaurant(_, { restaurantLoginInput }) {
            try {
                const { restEmail, restPass } = restaurantLoginInput;
                console.log(restaurantLoginInput)
                const result = await Restaurant.findOne({RestEmail : restEmail})
                if (!result) {
                    throw new Error("Invalid email");
          
                }
                console.log("rest result",result);
                const match = await bcrypt.compare(restPass, result.RestPass);
                if (!match) {
                    throw new Error("Invalid password");  
                }
                const payload = {
                    RestId: result._id,
                    RestName: result.RestName,
                    RestEmail: result.RestEmail,
                    RestType : result.RestType,
                    IsOwner: true
                    };
                const token = jwt.sign(payload, 'jwt_ubereats', {expiresIn: "2h"});
                return "JWT "+token;
               
            } catch(error) {
                console.log("======inside catch:");
                console.log("error==", error);
                throw new Error(error);
               
            }
        },

        async updateOrderStatus(parent, {orderUpdateInput}) {
            try {
                const { order_id, status} = orderUpdateInput;
                const update = {
                    Status: status
                }
                console.log(order_id, status)
                const result = await Order.findByIdAndUpdate(order_id, update, { new:true });
                console.log(result)
                return "Order Status Updated"
            } catch(error) {
                console.log(error);
                throw new Error(error);
            }
        },
   
    }
}

module.exports = {resolvers};