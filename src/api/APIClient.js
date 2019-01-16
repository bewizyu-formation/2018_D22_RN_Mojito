export default class APIClient {
  static loginUser(userPhoneNumber, userPassword) {
    return fetch('https://familink-api.cleverapps.io/public/login',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          phone: userPhoneNumber,
          password: userPassword,
        }),
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static createUser(userPhoneNumber, userPassword, userFirstName,
    userLastName, userEmail, userProfile) {
    return fetch('https://familink-api.cleverapps.io/public/sign-in?contactsLength=0',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          phone: userPhoneNumber,
          password: userPassword,
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          profile: userProfile,
        }),
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static forgotPassword(userPhoneNumber) {
    return fetch('https://familink-api.cleverapps.io/public/forgot-password',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          phone: userPhoneNumber,
        }),
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static getCurrentUser(token) {
    return fetch('https://familink-api.cleverapps.io/secured/users/current',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static updateUser(token, userFirstName, userLastName, userEmail, userProfile) {
    return fetch('https://familink-api.cleverapps.io/secured/users',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body: JSON.stringify({
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          profile: userProfile,
        }),
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static getProfiles() {
    return fetch('https://familink-api.cleverapps.io/public/profiles',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static getContacts(token) {
    return fetch('https://familink-api.cleverapps.io/secured/users/contacts',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static deleteContact(token, idContact) {
    return fetch(`https://familink-api.cleverapps.io/secured/users/contacts/${idContact}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static updateContact(token, idContact) {
    fetch(`https://familink-api.cleverapps.io/secured/users/contacts/${idContact}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }

  static addContact(token, contactPhoneNumber, contactFirstName,
    contactLastName, contactEmail, contactProfile, contactGravatar,
    contactIsFamilinkUser, contactIsEmergencyUser) {
    return fetch('https://familink-api.cleverapps.io/secured/users/contacts/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          phone: contactPhoneNumber,
          firstName: contactFirstName,
          lastName: contactLastName,
          email: contactEmail,
          profile: contactProfile,
          gravatar: contactGravatar,
          isFamilinkUser: contactIsFamilinkUser,
          isEmergencyUser: contactIsEmergencyUser,
        }),
      })
      .then(response => response.json())
      .then(responseJSON => responseJSON)
      .catch();
  }
}
