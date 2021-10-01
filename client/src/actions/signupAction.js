import { CUSTOMER_SIGNUP, RESTAURANT_SIGNUP } from "./types";
import backendServer from "../webConfig.js"
import axios from "axios";

export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/customer`, customerData)
        .then(response => dispatch({
            type: CUSTOMER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}

export const restaurantSignup = (restData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/restaurant`, restData)
        .then(response => dispatch({
            type: RESTAURANT_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}