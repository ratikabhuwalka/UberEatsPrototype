import { GET_CUSTOMER, UPDATE_CUSTOMER } from '../actions/types';

 const initialState = {
     user: {}
 };

 export default function(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_CUSTOMER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
 };