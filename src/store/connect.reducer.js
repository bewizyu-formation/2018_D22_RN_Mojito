import { UPDATE_CONNECTIVITY } from './connect.action';
import { USER_LOGGEDIN, LOGIN_USER, LOGOUT_USER, DISCONNECT_USER,CREATE_USER,UPDATE_USER } from './connect.action';

import APIClient from '../api/APIClient'

export const initialState = {
    connectivity: false,
    token: undefined,
    loading: false,
    loaded: false,
    error: undefined,
    phone: undefined,
};

export function connectReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTIVITY: {
            return {
                ...state,
                connectivity: action.connectivity
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
                contacts: []
            }
        }
        default :
        return state;
    }
};