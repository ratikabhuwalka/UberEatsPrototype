import {gql} from "apollo-boost";

const getRestaurantQuery = gql`
query ($restId: ID!){
  getRestaurant(restId:$restId){
    _id
    RestCity
    RestType
    RestCountry
    RestName
    EndTime
    RestPhone
    RestEmail
    RestImage
    Dishes {
      DishName
      Ingredients
      Price
      MealType
      _id
      Description
      Category
      DishImage
    }
  }}
`;

const getCustomerQuery = gql`
query ($custId: String){
  getCustomer(custId:$custId){
    _id
    CustName
    CustEmail
    CustCity
    }
  }
`;

const getRestaurants = gql`
query ($cust_city: String, $search: String){
  getRestaurants(custId:$custId, search:$search)}
`;

const getCustomerOrders = gql` 
query ($custId: ID!){
getCustomerOrders(custId:$custId)}
`;

const getRestaurantOrders = gql` 
query ($restId: ID!){
getRestaurantOrders(restId:$restId)}
`;
export { getCustomerQuery, getRestaurantQuery, getRestaurantOrders,
     getRestaurants, getCustomerOrders};
