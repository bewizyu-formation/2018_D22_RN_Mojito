export const UPDATE_CONNECTIVITY = 'UPDATE_CONNECTIVITY';

export const USER_LOGGEDIN = 'USER_LOGGEDIN';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER'

export const LOGOUT_USER = 'LOGOUT_USER';

export const USER_UPDATED = 'USER_UPDATED';
export const UPDATE_USER = 'UPDATE_USER';

export const USER_CREATED = 'USER_CREATED';
export const CREATE_USER = 'CREATE_USER';

export const PASSWORD_SENT = 'PASSWORD_SENT';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';

import APIClient from '../api/APIClient'

export function updateConnectivity(connectivity) {
    return {
        type : UPDATE_CONNECTIVITY,
        connectivity
    }
}
export function getCurrentUser(data){
    return{
        type : GET_CURRENT_USER,
        phone : data.phone,
        firstname : data.firstName,
        lastname : data.lastName,
        email : data.email,
        profile : data.profile,
    }
}
export function userLoggedIn(data) {
    return (dispatch) => {
        dispatch({
            type : USER_LOGGEDIN,
            token : data.token,
            error : data.message
        });
        return APIClient.getCurrentUser(data.token)
            .then((data) => dispatch(getCurrentUser(data)))
            .catch();
    }
}

export function loginUser(phone, password) {
    return (dispatch) => {
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

export function userUpdated(data) {
    return {
        type : USER_UPDATED,
        firstname : data.firstName,
        lastname : data.lastName,
        email : data.email,
        profile : data.profile,
        error : data.message
    }
}

export function updateUser(token, firstname, lastname, email, profile) {
    return (dispatch) => {
        dispatch({type: UPDATE_USER});
        return APIClient.updateUser(token, firstname, lastname, email, profile)
            .then((data) => dispatch(userUpdated(data)))
            .catch();
    }
}

export function userCreated(data) {
    return {
        type : USER_CREATED,
        phone : data.phone,
        firstname : data.firstName,
        lastname : data.lastName,
        email : data.email,
        profile : data.profile,
        error : data.message,
    }
}

export function createUser(phone, password, firstname, lastname, email, profile) {
    return (dispatch) => {
        dispatch({type: CREATE_USER});
        return APIClient.createUser(phone, password, firstname, lastname, email, profile)
            .then((data) => dispatch(userCreated(data)))
            .catch();
    }
}

export function passwordSent(data) {
    return {
        type : PASSWORD_SENT,
        error : data.message,
    }
}

export function forgotPassword(phone) {
    return (dispatch) => {
        dispatch({type: FORGOT_PASSWORD});
        return APIClient.forgotPassword(phone)
            .then((data) => dispatch(passwordSent(data)))
            .catch();
    }
}