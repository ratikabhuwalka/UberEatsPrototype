import { CUSTOMER_SIGNUP, OWNER_SIGNUP } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/grubhub/signup/customer`, customerData)
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

export const ownerSignup = (ownerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/grubhub/signup/restaurant`, ownerData)
        .then(response => dispatch({
            type: OWNER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: OWNER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}