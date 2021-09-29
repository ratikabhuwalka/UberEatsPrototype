import { GET_OWNER, UPDATE_OWNER } from '../actions/types';

 const initialState = {
     user: {},
     item: {}
 };

 export default function(state = initialState, action){
    switch(action.type){
        case GET_OWNER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_OWNER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
 };