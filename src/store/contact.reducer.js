import {
  PROFILES_LOADED, LOAD_PROFILES, CONTACTS_LOADED, LOAD_CONTACTS,
  CONTACT_ADDED, ADD_CONTACT, CONTACT_DELETED, DELETE_CONTACT,
  CONTACT_UPDATED, UPDATE_CONTACT, DELETE_ALL_CONTACT
} from './contact.action';

export const initialState = {
  loading: false,
  loaded: false,
  contacts: [],
  profiles: [],
  contactsError: undefined,
  addingError: undefined,
  deleteError: undefined,
  updateError: undefined,
};

export function contactReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILES_LOADED: {
      return {
        ...state,
        profiles: action.profiles,
        loading: false,
        loaded: true,
      };
    }
    case LOAD_PROFILES: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case CONTACTS_LOADED: {
      return {
        ...state,
        contacts: action.contacts,
        contactsError: action.error,
        loading: false,
        loaded: true,
      };
    }
    case LOAD_CONTACTS: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case CONTACT_ADDED: {
      return {
        ...state,
        contacts: [...state.contacts,
          {
            phone: action.phone,
            firstName: action.firstName,
            lastName: action.lastName,
            email: action.email,
            profile: action.profile,
            gravatar: action.gravatar,
            isFamilinkUser: action.isFamilinkUser,
            isEmergencyUser: action.isEmergencyUser,
          },
        ].sort((a, b) => a.lastName - b.lastName),
        addingError: action.error,
        loading: false,
        loaded: true,
      };
    }
    case ADD_CONTACT: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case CONTACT_DELETED: {
      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== action.idContact),
        deleteError: action.error,
        loading: false,
        loaded: true,
      };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case CONTACT_UPDATED: {
      const updateContact = state.contacts.find(item => item._id === action.idContact);
      updateContact.firstName = action.firstName;
      updateContact.lastName = action.lastName;
      updateContact.email = action.email;
      updateContact.profile = action.profile;
      updateContact.gravatar = action.gravatar;
      updateContact.isFamilinkUser = action.isFamilinkUser;
      updateContact.isEmergencyUser = action.isEmergencyUser;

      const otherContacts = state.contacts.filter(item => item._id !== action.idContact);

      return {
        ...state,
        contacts: [...otherContacts, updateContact].sort((a, b) => a.lastName - b.lastName),
        updateError: action.error,
        loading: false,
        loaded: true,
      };
    }
    case UPDATE_CONTACT: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case DELETE_ALL_CONTACT: {
      return {
        ...state,
        loading: false,
        loaded: false,
        contacts: [],
        profiles: [],
        contactsError: undefined,
        addingError: undefined,
        deleteError: undefined,
        updateError: undefined,
      }
    }
    default:
      return state;
  }
}
