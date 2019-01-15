export default class APIClient {

    static loginUser(userPhoneNumber, userPassword) {
        fetch("https://familink-api.cleverapps.io/public/login",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ 
                    phone: userPhoneNumber, 
                    password: userPassword
                })
            })
            .then((response) => response.json())
            .then((responseJSON) =>{
                return responseJSON.token;
            })
            .catch((error) => console.error(error))
    }

    static createUser(){
        fetch("https://familink-api.cleverapps.io/public/sign-in?contactsLength=0",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ 
                    phone: userPhoneNumber, 
                    password: userPassword,
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: userEmail,
                    profile: userProfile,
                })
            })
            .then((response) => response.json())
            .then((responseJSON) =>{
                return responseJSON;
            })
            .catch((error) => console.error(error))
    }
}
