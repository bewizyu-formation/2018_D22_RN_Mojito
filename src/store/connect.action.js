export const UPDATE_CONNECTIVITY = 'UPDATE_CONNECTIVITY';

export const USER_LOGGEDIN = 'USER_LOGGEDIN';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';

import APIClient from '../api/APIClient'

export function updateConnectivity(connectivity) {
    return {
        type : UPDATE_CONNECTIVITY,
        connectivity
    }
}

export function userLoggedIn(data) {
    return {
        type : USER_LOGGEDIN,
        token : data.token,
        error : data.message
    }
}

export function loginUser(phone, password) {
    return (dispatch) => {
        // Dispatch load todos start
        dispatch({type: LOGIN_USER});
        return APIClient.loginUser(phone, password)
            .then((data) => dispatch(userLoggedIn(data)))
            .catch();
    }
}
export function logoutUser() {
    return {
        type : LOGIN_USER,
    }
}