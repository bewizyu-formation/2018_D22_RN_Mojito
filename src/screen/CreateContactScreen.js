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
import { loadProfiles } from '../store/contact.action';


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

//const FEEDBACK_CATEGORIES = ['Famille', 'Senior', 'Médecin'];

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
        lastnameEmpty: false,
        firstname: '',
        firstnameEmpty: false,
        phone: '',
        invalidPhone: false,
        email: '',
        invalidEmail: false,
        gravatar: '',
        profile: 'famille',
        profiles: ['famille', 'senior', 'medecin'],
        emergency: false,
      };
      this.onSelectprofile = this.onSelectprofile.bind(this);
    }

    componentWillMount(){
        
        this.props.loadProfiles.then(alert("profiles chargés"));
        //this.setState({profiles:this.props.loadProfiles})
    }

    onSelectprofile() {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: this.state.profiles,
        },
        (buttonIndex) => {
          this.setState({ profile: this.state.profiles[buttonIndex] });
        },
      );
    }

    pickerChange(index){
        this.state.profiles.map( (v,i) => {
            if (index === i){
                this.setState({profile: this.state.profiles[index]})
            }
        })
    }


    render() {
      return (
        <ScrollView>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Image
              style={styles.logo}
              source={{ uri: 'http://www.startup-innovation.fr/img/empty.png' }}
            />
            <Text style={styles.text}>Nom</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nom du contact"
              value={this.state.lastname}
              onChangeText={(value) => {
                this.setState({ lastname: value });
              }
        }
              onBlur={() => {
                if (this.state.lastname.length === 0) {
                  this.setState({ lastnameEmpty: true });
                } else {
                  this.setState({ lastnameEmpty: false });
                }
              }}
            />
            {this.state.lastnameEmpty ? (
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
              onChangeText={value => this.setState({ firstname: value })}
              onBlur={() => {
                if (this.state.firstname.length === 0) {
                  this.setState({ firstnameEmpty: true });
                } else {
                  this.setState({ firstnameEmpty: false });
                }
              }}
            />
            {this.state.firstnameEmpty ? (
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
              onChangeText={value => this.setState({ phone: value })}
              onBlur={() => {
                if (this.state.phone.length !== 10) {
                  this.setState({ invalidPhone: true });
                } else {
                  this.setState({ invalidPhone: false });
                }
              }}
            />
            {this.state.invalidPhone ? (
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
              onChangeText={value => this.setState({ email: value })}
              onBlur={() => {
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (reg.test(this.state.email) === false) {
                  this.setState({ invalidEmail: true });
                } else {
                  this.setState({ invalidEmail: false });
                }
              }}
            />
            {this.state.invalidEmail ? (
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
              onChangeText={value => this.setState({ gravatar: value })}
            />

            <Text style={styles.text}>Profil</Text>
            {Platform.OS === 'android' ? (
              <Picker
                selectedValue={this.state.profile}
                prompt="Profil du contact"
                mode="dropdown"
                style={{ height: 40, width: 250 }}
                onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>{
                    this.state.profiles.map( (v)=>{
                        return <Picker.Item key={v} color='#FF6C00' label={v} value={v} />})
                    }
              </Picker>
            )
              : (
                <TouchableOpacity onPress={this.onSelectprofile}>
                  <Text style={styles.textInput}>
                    {this.state.profile}
                  </Text>
                </TouchableOpacity>
              )

        }


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
                  if (this.state.lastname !== '' && this.state.phone !== '' && !this.state.invalidPhone
                    && this.state.email !== '' && !this.state.invalidEmail) {
                    this.props.navigation.navigate('Contacts');
                  } else {
                    Alert.alert('Création impossible', 'Un ou plusieurs champs sont mal renseignés');
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
};

const mapStateToProps = state => ({
    connectivity: state.connect.connectivity
  });
  const mapDispatchToProps = dispatch => ({
    loadProfiles: () => dispatch(loadProfiles),
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CreateContactScreen);
