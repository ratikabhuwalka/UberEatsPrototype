const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Customer {
      _id: ID!
      CustName: String!
      CustEmail: String!
      CustPass: String!
      CustPhone: String!
      DOB: String
      CustImage: String
      CustCity: String!
      CustCountry: String
  }

  type Restaurant {
       _id: ID!
       RestName: String!
       RestCity: String!
       RestCountry: String!
       RestType: String!
       EndTime: String!
       RestPhone: String!
       RestEmail: String!
       RestPass: String
       RestImage: String
       Dishes: [Dish]
   }

   type Dish {
       _id: ID!
       Price: Float!
       DishName: String!
       Ingredients: String
       MealType: String
       Description: String
       Category: String
       DishImage: String
       RestId: ID!

   }


   type Order {
    _id: ID!
    RestId: ID!
    CustId: ID!
    RestName: String!
    CustName: String!
    Timestamp: String!
    Address: String!
    Status: String!
    Delivery: Float!
    Tax: Float!
    Discout: Float!
    Total: Float!
    Final: Float!
    Instruction: String!
    OrderItem: [OrderDish]
  }

   type OrderDish {
       DishId: ID!
       DishName: String!
       Description: String!
       Subtotal: Float!
       Quantity: Int!
       Category: String!
       Price: Float!
   }

  input CustomerInput {
    CustEmail: String!
    CustPass: String!
    CustName: String!
    CustPhone: String!
    CustCity: String!
    CustCountry: String
    DOB: String
    }

  input RestaurantInput {
    RestName: String!
    RestCity: String!
    RestCountry: String!
    RestType: String!
    EndTime: String
    RestPhone: String!
    RestEmail: String!
    RestPass: String
    RestImage: String

  }

  input DishInput {
       Price: Float!
       DishName: String!
       Ingredients: String
       MealType: String
       Description: String
       Category: String
       DishImage: String
       RestId: ID!
  }

  input PlaceOrderInput{
       CustId: ID!
       RestId: ID!
       DishId: ID!
       DishName: String!
       Description: String!
       Subtotal: Float!
       Quantity: Int!
       Category: String!
       Price: Float!
  }

  input CustomerLoginInput {
      custEmail: String!
      custPass: String!
  }

  input RestaurantLoginInput {
      restEmail: String!
      restPass: String!
  }


  input OrderUpdateInput {
    order_id: ID!
    status: String!
  }


  type Query {
        getCustomer(custId: ID!): Customer!
        getRestaurant(restId: ID!): Restaurant!
        getRestaurants(customer_city: String, search: String): [Restaurant]
        getCustomerOrders(custId: ID!): [Order]
        getRestaurantOrders(restId: ID!): [Order]
        getOrderReceipt(orderId: ID!): Order!
  }
  type Mutation
   {
      loginCustomer(customerLoginInput: CustomerLoginInput!): String!
      loginRestaurant(restaurantLoginInput: RestaurantLoginInput!): String!
      addCustomer(customerInput: CustomerInput): Boolean
      addRestaurant(restaurantInput: RestaurnatInput): Boolean
      addDish(dishInput: DishInput): Boolean
      updateRestaurant(restaurantInput: RestaurnatInput): Boolean
      updateCustomer(customerInput: CustomerInput): String
      updateOrderStatus(orderUpdateInput: OrderUpdateInput): String
      placeOrder(placeOrderInput: [PlaceOrderInput]): Order!
  }

`;

module.exports = {typeDefs};