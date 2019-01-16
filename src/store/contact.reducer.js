import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, LOAD_CONTACTS } from './contact.action';

import APIClient from '../api/APIClient'

export const initialState = {
    contacts: [],
};

export function contactReducer(state = initialState, action) {
    switch (action.type) {
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