import React, { Component } from "react";
import { Button, Text,TextInput, View, Image, StyleSheet, TouchableHighlight } from "react-native";


export default class LoginScreen extends Component {
    
    static navigationOptions = {
        title: 'Connexion',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center'
          }
    };
    
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo} 
                    source={{uri: 'http://www.startup-innovation.fr/img/empty.png'}}
                />
                <Text style={styles.text}>Numéro de téléphone</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Entrer votre numéro de téléphone'
                    keyboardType='phone-pad'
                />
                <Text style={styles.text}>Mot de passe</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Entrer votre mot de passe'
                />
                <Text style={styles.link} onPress={()=>{
                    this.props.navigation.navigate('ForgotPassword');
                }}>Mot de passe oublié ?</Text>

                <View style={styles.buttonContainer}>
                   <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate('Contacts')}}
                        style={styles.button}>
                            
                        <Text style={styles.textButton}>Se connecter</Text>
                            
                    </TouchableHighlight>
            
                    <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate('CreateAccount')}}
                        style={styles.button}>
                            
                        <Text style={styles.textButton}>S'inscrire</Text>
                            
                    </TouchableHighlight>
                 
                    
                    
                </View>
                
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems:'center', 
        backgroundColor:'#FECB98'
    },
    link:{
        color:'#FF6C00'
    },
    textInput: {
        width: 250, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        backgroundColor: '#FFFFFF',
        margin:5 
    },
    logo : {
        width:150, 
        height:150, 
        margin:30,
        marginBottom:10
    },
    text: {
        fontSize: 20
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        margin:5
    },
    button:{
        margin: 5,
        width: 250,
        height: 40,
        backgroundColor:'#FF6C00'
    },
    
    buttonContainer:{
        margin:20
    }
});

