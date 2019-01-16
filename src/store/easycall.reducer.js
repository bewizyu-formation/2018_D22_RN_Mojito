import { UPDATE_CONNECTIVITY } from './easycall.action';
import { CONNECT_USER,DISCONNECT_USER,CREATE_USER,UPDATE_USER } from './easycall.action';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, LOAD_CONTACTS } from './easycall.action';

export const initialState = {
    connectivity: false,
    contacts: [],
};

export function easycallReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTIVITY: {
            return {
                ...state,
                connectivity: action.connectivity
            }
        }
        case ADD_CONTACT: {

            const phoneToAdd = state.contacts.filter(item => item.phone === action.phone);

            if (phoneToAdd.length > 0) {
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    contacts: [...state.contacts, 
                            {
                                phone: action.phone,
                                firstName: action.firstName,
                                lastName: action.lastName,
                                email: action.email,
                                profile: action.profile,
                                gravatar : action.gravatar,
                                isFamilinkUser : action.isFamilinkUser,
                                isEmergencyUser: action.isEmergencyUser
                            }
                    ],
                }
            }
        }
        default :
            return state;
    }
};