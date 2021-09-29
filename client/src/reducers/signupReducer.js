import { CUSTOMER_SIGNUP, OWNER_SIGNUP } from '../actions/types';

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_SIGNUP:
            return {
                ...state,
                user: action.payload
            };
        case OWNER_SIGNUP:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};