import APIClient from '../api/APIClient';

export const PROFILES_LOADED = 'PROFILES_LOADED';
export const LOAD_PROFILES = 'LOAD_PROFILES';

export const CONTACTS_LOADED = 'CONTACTS_LOADED';
export const LOAD_CONTACTS = 'LOAD_CONTACTS';

export const CONTACT_ADDED = 'CONTACT_ADDED';
export const ADD_CONTACT = 'ADD_CONTACT';

export const CONTACT_DELETED = 'CONTACT_DELETED';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const CONTACT_UPDATED = 'CONTACT_UPDATED';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

export const DELETE_ALL_CONTACT = 'DELETE_ALL_CONTACT'

export function profilesLoaded(data) {
  return {
    type: PROFILES_LOADED,
    profiles: data,
  };
}

export function loadProfiles() {
  return (dispatch) => {
    dispatch({ type: LOAD_PROFILES });
    return APIClient.getProfiles()
      .then(data => dispatch(profilesLoaded(data)))
      .catch();
  };
}

export function contactsLoaded(data) {
  return {
    type: CONTACTS_LOADED,
    contacts: data,
    error: data.message,
  };
}

export function loadContacts(token) {
  return (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    return APIClient.getContacts(token)
      .then(data => dispatch(contactsLoaded(data)))
      .catch();
  };
}

export function contactAdded(data) {
  return {
    type: CONTACT_ADDED,
    phone: data.phone,
    firstname: data.firstName,
    lastname: data.lastName,
    email: data.email,
    profile: data.profile,
    gravatar: data.gravatar,
    isFamilinkUser: data.isFamilinkUser,
    isEmergencyUser: data.isEmergencyUser,
    error: data.message,
  };
}

export function addContact(phone, firstName, lastName, email, profile,
  gravatar, isFamilinkUser, isEmergencyUser) {
  return (dispatch) => {
    dispatch({ type: ADD_CONTACT });
    return APIClient.addContact(phone, firstName, lastName, email, profile,
      gravatar, isFamilinkUser, isEmergencyUser)
      .then(data => dispatch(contactAdded(data)))
      .catch();
  };
}

export function contactDeleted(data, idContact) {
  return {
    type: CONTACT_DELETED,
    error: data.message,
    idContact,
  };
}

export function deleteContact(token, idContact) {
  return (dispatch) => {
    dispatch({ type: DELETE_CONTACT });
    return APIClient.deleteContact(token, idContact)
      .then(data => dispatch(contactDeleted(data, idContact)))
      .catch();
  };
}

export function contactUpdated(data, idContact, phone, firstName, lastName, email, profile,
  gravatar, isFamilinkUser, isEmergencyUser) {
  return {
    type: CONTACT_UPDATED,
    error: data.message,
    idContact,
    phone,
    firstname: firstName,
    lastname: lastName,
    email,
    profile,
    gravatar,
    isFamilinkUser,
    isEmergencyUser,
  };
}

export function updateContact(token, idContact, phone, firstName, lastName, email, profile,
  gravatar, isFamilinkUser, isEmergencyUser) {
  return (dispatch) => {
    dispatch({ type: UPDATE_CONTACT });
    return APIClient.updateContact(token, idContact, phone, firstName, lastName, email, profile,
      gravatar, isFamilinkUser, isEmergencyUser)
      .then(data => dispatch(contactUpdated(data, idContact, phone, firstName, lastName, email,
        profile, gravatar, isFamilinkUser, isEmergencyUser)))
      .catch();
  };
}

export function deleteAllContact(){
  return{
    type: DELETE_ALL_CONTACT,
  }
}
