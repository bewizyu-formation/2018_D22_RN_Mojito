import {
  UPDATE_CONNECTIVITY,
  USER_LOGGEDIN, LOGIN_USER, GET_CURRENT_USER, LOGOUT_USER,
  USER_UPDATED, UPDATE_USER, USER_CREATED, CREATE_USER,
  PASSWORD_SENT, FORGOT_PASSWORD,
} from './connect.action';

export const initialState = {
  connectivity: false,
  token: undefined,
  loading: false,
  loaded: false,
  loginError: undefined,
  createError: undefined,
  updateError: undefined,
  forgotError: undefined,
  phone: undefined,
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  profile: undefined,
};

export function connectReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONNECTIVITY: {
      return {
        ...state,
        connectivity: action.connectivity,
      };
    }
    case GET_CURRENT_USER: {
      return {
        ...state,
        phone: action.phone,
        firstname: action.firstname,
        lastname: action.lastname,
        email: action.email,
        profile: action.profile,
        loading: false,
        loaded: true,
      };
    }
    case USER_LOGGEDIN: {
      return {
        ...state,
        token: action.token,
        loginError: action.error,
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        token: undefined,
        loading: false,
        loaded: false,
        loginError: undefined,
        createError: undefined,
        updateError: undefined,
        forgotError: undefined,
        phone: undefined,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        profile: undefined,
      };
    }
    case USER_UPDATED: {
      return {
        ...state,
        updateError: action.error,
        loading: false,
        loaded: true,
        firstname: action.firstname,
        lastname: action.lastname,
        email: action.email,
        profile: action.profile,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case USER_CREATED: {
      return {
        ...state,
        createError: action.error,
        loading: false,
        loaded: true,
      };
    }
    case CREATE_USER: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case PASSWORD_SENT: {
      return {
        ...state,
        forgotError: action.error,
        loading: false,
        loaded: true,
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    default:
      return state;
  }
}
