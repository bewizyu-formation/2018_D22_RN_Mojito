export const CONNECT_USER = 'CONNECT_USER';
export const DISCONNECT_USER = 'DISCONNECT_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const LOAD_CONTACTS = 'LOAD_CONTACTS';

export function addContact(phone, firstName, lastName, email, profile, gravatar, isFamilinkUser, isEmergencyUser) {
    return {
        type: ADD_CONTACT,
        phone, firstName, lastName, email, profile, gravatar, isFamilinkUser, isEmergencyUser
    }
}

export function deleteConact(contact) {
    return {
        type: DELETE_CONTACT,
        contact
    }
}

export function updateContact (contact) {
    return {
        type : UPDATE_CONTACT,
        contact
    }
}

export function loadContacts (datas) {
    return {
        type : LOAD_CONTACTS,
        contacts : datas,
    }
}