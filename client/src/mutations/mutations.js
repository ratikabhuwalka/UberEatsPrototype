import {gql} from "apollo-boost";

  
  const addCustomer = gql`
  mutation addCustomer($CustEmail: String!, $CustPass: String!, $CustName: String!, $CustCity: String!,  
  $CustPhone: String!, $CustCountry: String, $DOB: String ){
    addCustomer ( 
    customerInput: {
      CustEmail: $CustEmail,
      CustPass: $CustPass, 
      CustName: $CustName, 
      CustCity: $CustCity,  
      CustPhone: $CustPhone,
      CustCountry: $CustCountry,
      DOB: $DOB
    }
    
  )} 
`;

const addRestaurant = gql`
  mutation addRestaurant($RestEmail: String!, $RestPass: String!, $RestName: String!, $RestCity: String!,  
  $RestPhone: String!, $RestCountry: String, $RestType: String , $StartTime: String, $EndTime: String){
    addRestaurant ( 
    restaurantInput: {
      RestEmail: $RestEmail,
      RestPass: $RestPass, 
      RestName: $RestName, 
      RestCity: $RestCity,  
      RestPhone: $RestPhone,
      RestCountry: $RestCountry,
      RestType: $RestType,
      StartTime: $StartTime,
      EndTime: $EndTime
    }
    
  )} 

`;
const addDish= gql`
  mutation addDish ( $Price: Float!,$DishName: String!,$Ingredients: String,$MealType: String,$Description: String,$Category: String,
    $DishImage: String, $RestId: ID!){
      addDish(
      addDishInput: {
       Price: $Price,
       DishName: $DishName,
       Ingredients: $Ingredients,
       MealType: $MealType,
       Description: $Description,
       Category: $Category,
       DishImage: $DishImage,
       RestId: $RestId
      }
      
      )
    }
      
    }`

const placeOrder = gql`
    mutation placeOrder( CustId: ID!, RestId: ID!, DishId: ID!, DishName: String!, Description: String!, Subtotal: Float!
       Quantity: Int!, Category: String!, Price: Float!){
      placeOrder(placeOrderInput: {

       CustId: $CustId,
       RestId: $RestId,
       DishId: $DishId,
       DishName: $DishName,
       Description: $Description,
       Subtotal: $Subtotal,
       Quantity: $Quantity,
       Category: $Category,
       Price: $Price
      })
    }
  }`;



const loginCustomerQuery = gql`
    mutation loginCustomer($email_id:String!, $password:String!){
    loginCustomer(customerLoginInput: { custEmail: $email_id,custPass:$password})
    }
    
`;

const loginRestaurantQuery = gql`
    mutation loginRestaurant($email_id:String!, $password:String!){
    loginRestaurant(restaurantLoginInput: { restEmail: $email_id,restPass:$password})
    }
`;


const updateOrderStatusMutation= gql`
  mutation updateOrderStatus($order_id: ID!, $status: String!) {
  updateOrderStatus(orderUpdateInput: {order_id: $order_id, status: $status})
}
`;



export {addCustomer, addRestaurant, addDish, placeOrder, loginCustomerQuery, loginRestaurantQuery, updateOrderStatusMutation};


