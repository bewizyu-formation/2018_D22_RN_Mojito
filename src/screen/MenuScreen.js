import React, { Component } from 'react';
import {Platform, ActionSheetIOS, Text, View, StyleSheet, Alert,
  ScrollView, KeyboardAvoidingView,
  TextInput, TouchableOpacity,TouchableHighlight, Picker } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser,logoutUser } from '../store/connect.action';
import { deleteAllContact } from '../store/contact.action';

const workingOS = Platform.select({
  ios: 'iOS',
  android: 'android',
});

const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FECB98',
    padding: 10,
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
  primaryButton: {
    margin: 5,
    width: 250,
    height: 40,
    backgroundColor: '#FF6C00',
  },
  buttonContainer: {
    margin: 20,
  },
});


export class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      isEmailValid: true,
      profile: this.props.profile,
      isEditable: false,
    };
    this.onSelectProfile = this.onSelectProfile.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.onEditPress = this.onEditPress.bind(this);
    this.onDisconnectPress = this.onDisconnectPress.bind(this); 
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

  handleFirstNameInput(text) {
    this.setState({
      firstname: text,
    });
  }

  handleLastNameInput(text) {
    this.setState({
      lastname: text,
    });
  }

  handleEmailInput(text) {
    this.setState({
      email: text,
      isEmailValid: emailRegEx.test(text),
    });
  }

  onEditPress() {
    if (!this.state.isEditable) {
      this.setState({ isEditable: true });
    } else {
      this.handleAccountUpdate();
    }
  }

  onDisconnectPress(){
    this.props.logoutUser();
    this.props.deleteAllContact();
    this.props.navigation.navigate('Login');
  }

  handleAccountUpdate() {
    if (this.props.connectivity) {
      if (this.state.isEmailValid) {
        this.props.updateUser(this.props.token, this.state.firstname,
          this.state.lastname, this.state.email, this.state.profile)
          .then(() => {
            if (this.props.updateError === undefined) {
              this.setState({ isEditable: false });
            } else {
              Alert.alert('Erreur de mise a jour du profile', 'Veuillez recommencer votre saisie.');
              this.setState({
                firstname: this.props.firstname,
                lastname: this.props.lastname,
                email: this.props.email,
                isEmailValid: true,
                profile: this.props.profile,
                isEditable: false,
              })
            }
          });
      } else {
        Alert.alert('Erreur de saisie', 'Merci de renseigner un email valide.');
      }
    } else {
      Alert.alert('Attention', 'Pas de connexion internet.');
    }
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={(this.state.isPhoneLenghtCorrect)
            ? ({ ...styles.text, color: 'green' }) : (styles.text)}
          >
            Numéro de téléphone
          </Text>
          <Text style={styles.text}>{this.props.phone}</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.firstname}
            editable={this.state.isEditable}
            onChangeText={text => this.setState({ firstname: text })}
          />
          <Text style={styles.text}>Nom de famille</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.lastname}
            editable={this.state.isEditable}
            onChangeText={text => this.setState({ lastname: text })}
          />
          <Text style={(this.state.isEmailValid)
            ? ({ ...styles.text, color: 'green' }) : (styles.text)}
          >
            Email
        </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.email}
            editable={this.state.isEditable}
            onChangeText={text => this.handleEmailInput(text)}
          />
          {
            (this.state.isEditable) ? (
              (workingOS === 'iOS') ? (
                <TouchableOpacity onPress={this.onSelectProfile}>
                  <Text style={styles.pickerTextIOS}>
                    {this.state.profile}
                  </Text>
                </TouchableOpacity>
              ) : (
                  <Picker
                    selectedValue={this.state.profile}
                    style={styles.picker}
                    mode="dropdown"
                    onValueChange={itemValue => this.setState({ profile: itemValue })}
                  >
                    {
                      this.props.profiles.map(
                        v => <Picker.Item key={v} label={v} value={v} />,
                      )
                    }
                  </Picker>
                )
            ) : (
                <Text style={styles.text}>{this.state.profile}</Text>
              )
          }

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => { this.onEditPress; }}
              style={styles.primaryButton}
            >

              <Text style={styles.textPrimaryButton}>Editer</Text>

            </TouchableHighlight>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => { 
                Alert.alert(
                  'Attention',
                  'Etes vous sûr de vouloir vous déconnecter ?',
                  [
                    {text: 'NON', onPress: () => false ,sytle: 'cancel'},
                    {text: 'OUI', onPress: () => this.onDisconnectPress()},
                    
                  ],
                )
               }}
              style={styles.primaryButton}
            >

              <Text style={styles.textPrimaryButton}>Déconnexion</Text>

            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

    );
  }
}

MenuScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  connectivity: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  phone: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  deleteAllContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  token: state.connect.token,
  profiles: state.contact.profiles,
  phone: state.connect.phone,
  firstname: state.connect.firstname,
  lastname: state.connect.lastname,
  email: state.connect.email,
  profile: state.connect.profile,
});
const mapDispatchToProps = dispatch => ({
  updateUser: (token, firstname, lastname, email, profile) => dispatch(updateUser(token, firstname, lastname, email, profile)),
  logoutUser: () => dispatch(logoutUser()),
  deleteAllContact: () => dispatch(deleteAllContact()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuScreen);
