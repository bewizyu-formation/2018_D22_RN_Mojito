import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActionSheetIOS,
  Platform,
  Alert,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Image,
  Picker,
  Switch,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { logoutUser } from '../store/connect.action';
import { addContact, deleteAllContact,loadProfiles } from '../store/contact.action';

const phoneLength = 10;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FECB98',
    padding: 10,
  },
  pickerTextIOS: {
    marginTop: 5,
    color: '#FF6C00',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textInput: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 5,
  },
  logo: {
    width: 150,
    height: 150,
    margin: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 15,
  },
  textAlert: {
    color: 'red',
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

class CreateContactScreen extends Component {
  static navigationOptions = {
    title: 'Créer un contact',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      lastname: '',
      isLastnameEmpty: false,
      firstname: '',
      isFirstnameEmpty: false,
      phone: '',
      isValidPhone: true,
      email: '',
      isValidEmail: true,
      gravatar: '',
      profile: 'FAMILLE',
      familinkUser: false,
      emergency: false,
    };
    this.onSelectprofile = this.onSelectProfile.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);
  }

  componentDidMount() {

    this.props.loadProfiles();

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

  pickerChange(index) {
    this.props.profiles.map((v, i) => {
      if (index === i) {
        this.setState({ profile: this.props.profiles[index] });
      }
    });
  }

  handlePhoneInput(text) {
    if (text.length <= phoneLength) {
      this.setState({
        phone: text,
        isValidPhone: (text.length === phoneLength),
      });
    }
  }


  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image
            style={styles.logo}
            source={require('../../assets/logo-app.png')}
          />
          <Text style={styles.text}>Nom</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nom du contact"
            value={this.state.lastname}
            onChangeText={(text) => {
              this.setState({ lastname: text });
            }
            }
            onBlur={() => {
              if (this.state.lastname.length === 0) {
                this.setState({ isLastnameEmpty: true });
              } else {
                this.setState({ isLastnameEmpty: false });
              }
            }}
          />
          {this.state.isLastnameEmpty ? (
            <Text style={styles.textAlert}>Le nom du contact doit être renseigné</Text>
          ) : (
              null
            )
          }

          <Text style={styles.text}>Prénom</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Prénom du contact"
            value={this.state.firstname}
            onChangeText={text => this.setState({ firstname: text })}
            onBlur={() => {
              if (this.state.firstname.length === 0) {
                this.setState({ isFirstnameEmpty: true });
              } else {
                this.setState({ isFirstnameEmpty: false });
              }
            }}
          />
          {this.state.isFirstnameEmpty ? (
            <Text style={styles.textAlert}>Le prénom du contact doit être renseigné</Text>
          ) : (
              null
            )
          }


          <Text style={styles.text}>Numéro de téléphone</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Numéro de téléphone du contact"
            keyboardType="phone-pad"
            value={this.state.phone}
            onChangeText={text => {
              this.handlePhoneInput(text);
            }
            }
          />
          {!this.state.isValidPhone ? (
            <Text style={styles.textAlert}>Numéro de téléphone invalide</Text>
          ) : (
              null
            )
          }

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Adresse mail du contact"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            onBlur={() => {
              const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (reg.test(this.state.email) === false) {
                this.setState({ isValidEmail: false });
              } else {
                this.setState({ isValidEmail: true });
              }
            }}
          />
          {!this.state.isValidEmail ? (
            <Text style={styles.textAlert}>Le format de l'adresse mail n'est pas valide</Text>
          ) : (
              null
            )
          }


          <Text style={styles.text}>Avatar</Text>
          <TextInput
            style={styles.textInput}
            placeholder="URL de l'avatar du contact"
            value={this.state.gravatar}
            onChangeText={text => this.setState({ gravatar: text })}
          />

          <Text style={styles.text}>Profil</Text>
          {this.props.profiles !== undefined
            ? Platform.OS === 'android' ? (
              <Picker
                selectedValue={this.state.profile}
                prompt="Profil du contact"
                mode="dropdown"
                style={{ height: 40, width: 250 }}
                onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}
              >
                {
                  this.props.profiles.map(v => <Picker.Item key={v} color="#FF6C00" label={v} value={v} />)
                }
              </Picker>
            )
              : (
                <TouchableOpacity onPress={this.onSelectProfile}>
                  <Text style={styles.pickerTextIOS}>
                    {this.state.profile}
                  </Text>
                </TouchableOpacity>
              )

            : (
              null
            )}


          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Utilisateur d'EasyCall ? </Text>
            <Switch
              onValueChange={value => this.setState({ familinkUser: value })}
              style={{ marginTop: 15, marginLeft: 10, transform: Platform.OS === 'android' ? [{ scaleX: 1.5 }, { scaleY: 1.5 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
              value={this.state.familinkUser}
            />
          </View>


          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Contacter en cas d'urgence </Text>
            <Switch
              onValueChange={value => this.setState({ emergency: value })}
              style={{ marginTop: 15, marginLeft: 10, transform: Platform.OS === 'android' ? [{ scaleX: 1.5 }, { scaleY: 1.5 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
              value={this.state.emergency}
            />

          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => {
                if (this.props.connectivity) {
                  if (this.state.lastname !== '' && this.state.phone !== '' && this.state.isValidPhone
                    && this.state.email !== '' && this.state.isValidEmail) {
                    this.props.addContact(
                      this.props.token,
                      this.state.phone,
                      this.state.firstname,
                      this.state.lastname,
                      this.state.email,
                      this.state.profile,
                      this.state.gravatar,
                      this.state.familinkUser,
                      this.state.emergency,
                    ).then(() => {
                      console.log(this.props.addingError);
                      if (this.props.addingError !== undefined) {
                        if(this.props.addingError === 'Security token invalid or expired'){
                          Alert.alert('Votre session a expirée');
                          this.props.logoutUser();
                          this.props.deleteAllContact();
                          this.props.navigation.navigate('Login');
                        }else {
                          Alert.alert('Erreur lors de la création',this.props.addingError);
                        }
                        
                      } else {
                        this.props.navigation.navigate('Contacts');
                      }

                    });
                  } else {
                    Alert.alert('Création impossible', 'Un ou plusieurs champs sont mal renseignés');
                  }
                } else {
                  Alert.alert('Pas de connexion internet');
                }
              }}
              style={styles.primaryButton}
            >

              <Text style={styles.textPrimaryButton}>Créer contact</Text>

            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}


CreateContactScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  connectivity: PropTypes.bool.isRequired,
  loadProfiles: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteAllContact: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  addingError: PropTypes.string,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  profiles: state.contact.profiles,
  addingError: state.contact.addingError,
  token: state.connect.token,
});
const mapDispatchToProps = dispatch => ({
  loadProfiles: () => dispatch(loadProfiles()),
  logoutUser: () => dispatch(logoutUser()),
  deleteAllContact: () => dispatch(deleteAllContact()),
  addContact: (
    phone,
    firstName,
    lastName, email,
    profile,
    gravatar,
    isFamilinkUser,
    isEmergencyUser,
  ) => dispatch(addContact(
    phone,
    firstName,
    lastName,
    email,
    profile,
    gravatar,
    isFamilinkUser,
    isEmergencyUser,
  )),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateContactScreen);
