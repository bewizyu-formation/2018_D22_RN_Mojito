import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, TextInput, View, Image, StyleSheet, TouchableHighlight, KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FECB98',
    padding:10
  },
  link: {
    color: '#FF6C00',
  },
  textInput: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    margin: 5,
  },
  logo: {
    width: 150,
    height: 150,
    margin: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
  },
  textPrimaryButton: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 5,
  },
  textSecondaryButton: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    margin: 5,
  },
  primaryButton: {
    margin: 5,
    width: 250,
    height: 40,
    backgroundColor: '#FF6C00'
  },
  secondaryButton: {
    margin: 5,
    width: 250,
    height: 40,
    backgroundColor: '#FFFFFF'
  },
  buttonContainer: {
    margin: 20,
  },
});

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Connexion',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: ''
    }

    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onPhoneChange(value) {
    this.setState({ phone: value });
  }

  onPasswordChange(value) {
    this.setState({ password: '' });
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={styles.logo}
          source={{ uri: 'http://www.startup-innovation.fr/img/empty.png' }}
        />
        <Text style={styles.text}>Numéro de téléphone</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Entrer votre numéro de téléphone"
          keyboardType="phone-pad"
          onChangeText={this.onPhoneChange}
        />
        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Entrer votre mot de passe"
          onChangeText={this.onPasswordChange}
        />
        <Text
          style={styles.link}
          onPress={() => {
            this.props.navigation.navigate('ForgotPassword');
          }}
        >
          Mot de passe oublié ?
          </Text>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => {
              if(this.state.phone.length != 10){
                alert("Numéro de téléphone invalide");
              }else if(this.state.password == ''){
                alert("Mot de passe requis")
              } else {  
                //TODO: Vérifier si utilisateur existe
                this.props.navigation.navigate('Contacts');
              }
              
            }}
            style={styles.primaryButton}
          >

            <Text style={styles.textPrimaryButton}>Se connecter</Text>

          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('CreateAccount');
            }}
            style={styles.secondaryButton}
          >

            <Text style={styles.textSecondaryButton}>S&#39;inscrire</Text>

          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>

      </ScrollView>
      
      );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),

}
