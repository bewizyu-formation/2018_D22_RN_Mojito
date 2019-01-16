import { UPDATE_CONNECTIVITY } from './connect.action';
import { USER_LOGGEDIN, LOGIN_USER,GET_CURRENT_USER, LOGOUT_USER, USER_UPDATED, UPDATE_USER, CREATE_USER } from './connect.action';

import APIClient from '../api/APIClient'

export const initialState = {
    connectivity: false,
    token: undefined,
    loading: false,
    loaded: false,
    error: undefined,
    phone: undefined,
    firstname : undefined,
    lastname : undefined,
    email : undefined,
    profile : undefined,
};

export function connectReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTIVITY: {
            return {
                ...state,
                connectivity: action.connectivity
            }
        }
        case GET_CURRENT_USER: {
            return {
                ...state,
                phone: action.phone,
                firstname : action.firstname,
                lastname : action.lastname,
                email : action.email,
                profile : action.profile,
            }
        }
        case USER_LOGGEDIN: {
            return {
                ...state,
                token : action.token,
                error : action.message,
                loading : false,
                loaded : true,
            }
        }
        case LOGIN_USER: {
            return {
                ...state,
                loading: true,
                loaded : false,
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                token: undefined,
                loading: false,
                loaded: false,
                error: undefined,
                phone: undefined,
            }
        }
        case USER_UPDATED: {
            return {
                ...state,
                error : action.message,
                loading : false,
                loaded : true,
                firstname : action.firstname,
                lastname : action.lastname,
                email : action.email,
                profile : action.profile,
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                loading: true,
                loaded : false,
            }
        }
        default :
            return state;
    }
};