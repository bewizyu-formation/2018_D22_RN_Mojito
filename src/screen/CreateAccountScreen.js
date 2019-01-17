import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform, ActionSheetIOS, TouchableOpacity,
  Text, TextInput, View, Picker, StyleSheet, 
  TouchableHighlight, KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { createUser } from '../store/connect.action';
import { loadProfiles } from '../store/contact.action';

const workingOS = Platform.select({
  ios: 'iOS',
  android: 'android',
});

const phoneLength = 10;
const passwordLength = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FECB98',
    padding: 10,
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
  picker: {
    flex: 1,
    width: 250,
    height: 40,
    color: '#FF6C00',

    justifyContent: 'center',
  },
  pickerTextIOS: {
    marginTop: 5,
    color: '#FF6C00',
    fontWeight: 'bold',
    fontSize: 20,
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
    backgroundColor: '#FF6C00',
  },
  secondaryButton: {
    margin: 5,
    width: 250,
    height: 40,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    margin: 20,
  },
});

class CreateAccountScreen extends Component {
  static navigationOptions = {
    title: 'Inscription',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      isPhoneLenghtCorrect: false,
      password: '',
      isPasswordLenghtCorrect: false,
      confirmedPassword: '',
      firstname: '',
      lastname: '',
      email: '',
      profile: 'FAMILLE',
      isPasswordConfirmed: false,
    };
    this.onSelectProfile = this.onSelectProfile.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  componentWillMount() {
    this.props.loadProfiles();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  onSelectProfile() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: this.props.profiles,
      },
      (buttonIndex) => {
        this.setState({ profile: this.props.profiles[buttonIndex] });
      },
    );
  }

  handlePhoneInput(text) {
    if (text.length <= phoneLength) {
      this.setState({
        phone: text,
        isPhoneLenghtCorrect: (text.length === phoneLength) ? true : false,
      })
    }
  }

  handlePasswordInput(text) {
    if (text.length <= passwordLength) {
      this.setState({
        password: text,
        isPasswordLenghtCorrect: (text.length === passwordLength) ? true : false,
      })
    }
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.text}>Numéro de téléphone</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre numéro de téléphone"
            keyboardType="phone-pad"
            value={this.state.phone}
            onChangeText={text => this.handlePhoneInput(text)}
          />
          <Text style={styles.text}>Mot de passe ({passwordLength} caractères)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre mot de passe"
            value={this.state.password}
            onChangeText={text => this.handlePasswordInput(text)}
          />
          <Text style={styles.text}>Confirmer mot de passe</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmez votre mot de passe"
            value={this.state.confirmedPassword}
            onChangeText={text => this.setState({ confirmedPassword: text })}
          />
          <Text style={styles.text}>Prénom</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre  prénom"
            value={this.state.firstname}
            onChangeText={text => this.setState({ firstname: text })}
          />
          <Text style={styles.text}>Nom de famille</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre nom de famille"
            value={this.state.lastname}
            onChangeText={text => this.setState({ lastname: text })}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre email"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <Text style={styles.text}>Quel est votre profile ?</Text>
          {
            (workingOS === "iOS") ? (
              <TouchableOpacity onPress={this.onSelectProfile}>
                  <Text style={styles.pickerTextIOS}>
                    {this.state.profile}
                  </Text>
              </TouchableOpacity>
            ) : (
              <Picker selectedValue = {this.state.profile} style={styles.picker}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) => this.setState({profile: itemValue})}>
                {
                  this.props.profiles.map( (v, index)=>{
                    return <Picker.Item key={index} label={v} value={v} />
                  })
                }
              </Picker>
            )
          }
          

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('LoginAccount');
              }}
              style={styles.primaryButton}
            >

              <Text style={styles.textPrimaryButton}>S&#39;inscrire</Text>

            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>

      </ScrollView>

    );
  }
}

CreateAccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  connectivity: PropTypes.bool.isRequired,
  createError: PropTypes.string,
};

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  createError: state.connect.loginError,
  profiles: state.contact.profiles,
});
const mapDispatchToProps = dispatch => ({
  createUser: (phone, password, firstname, lastname, email, profile) => dispatch(createUser(phone, password, firstname, lastname, email, profile)),
  loadProfiles: () => dispatch(loadProfiles()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScreen);