import { combineReducers } from 'redux';
//import customerProfileReducer from './customerProfileReducer'
//import ownerProfileReducer from './ownerProfileReducer'
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
//import signupReducer from './signupReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer
    // customerProfile: customerProfileReducer,
    // ownerProfile: ownerProfileReducer
});