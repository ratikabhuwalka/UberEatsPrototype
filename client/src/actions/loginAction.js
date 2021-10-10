import { USER_LOGIN, USER_LOGOUT } from "./types";
import axios from "axios";
import backendServer from "../webConfig";

export const userLogin = (loginData) => dispatch => {
    axios.defaults.withCredentials = true;
    let url=""
    if(loginData.is_owner){
        url = `${backendServer}/restaurant`
    }
    else{
        url = `${backendServer}/customer`
    }
    axios.get(url,{params: loginData})
        .then(response => dispatch({
            type: USER_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: error.response.data
                });
            }
        });
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});