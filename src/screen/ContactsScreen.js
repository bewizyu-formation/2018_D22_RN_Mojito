import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, FlatList, Text, Platform, BackHandler, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import ContactItem from '../component/ContactItem';
import AddButton from '../component/AddButton';
import { logoutUser } from '../store/connect.action';
import { loadContacts, deleteAllContact, loadProfiles } from '../store/contact.action';
import MenuButton from '../component/MenuButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6C00',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerSpaceLastContact: {
    height: '85%',
  },
  textStyle: {
    marginRight: Platform.OS === 'ios' ? 8 : 12,
    fontSize: Platform.OS === 'ios' ? 12 : 14,
    paddingRight: 5,
    paddingLeft: 5
  },
  textBackgroundActive: {
    backgroundColor: '#FECB98',
  },
  textBackgroundInactive: {
    backgroundColor: '#FF6C00',
  },
  textInactive: {
    color: '#FFF'
  },
  textActive:{
    color: '#000'
  },
  containerStyleSearchBar: {
    backgroundColor: '#FFF',
  },
});

class ContactsScreen extends Component {
    static navigationOptions =({ navigation }) => ({
      headerTitle: 'Contacts',
      headerRight: <AddButton navigation={navigation} />,
      headerLeft: <MenuButton navigation={navigation} />,
    });

    constructor(props) {
      super(props);
      this.state = {
        activeAll: true,
        activeFamily: false,
        activeSenior: false,
        activeMedical: false,
        activeEmergency: false,
      };
      this._didFocusSubscription = props.navigation.addListener('didFocus', () => BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid));
      this.onPressContact = this.onPressContact.bind(this);
      this.onBackButtonPressAndroid = this.onBackButtonPressAndroid.bind(this);
      this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
      if (this.props.connectivity) {
        this.props.loadContacts(this.props.token)
          .then(() => {
            if (this.props.contactsError !== undefined) {
              Alert.alert('Perte de session', 'Votre session a expiré');
              this.props.logoutUser();
              this.props.deleteAllContact();
              this.props.navigation.navigate('Login');
            } else {
              this.props.loadProfiles();
            }
          });
      } else {
        Alert.alert('Connexion perdue', 'Pas de connexion internet');
      }
      this._willBlurSubscription = this.props.navigation.addListener('willBlur', () => BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid));
    }

    componentWillUnmount() {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => true;

    onPressContact = (item) => {
      this.props.navigation.navigate('Detail', {
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
        email: item.email,
        gravatar: item.gravatar,
        profile: item.profile,
        isEmergencyUser: item.isEmergencyUser,
        id: item._id,
      });
    }

    onSearch = (text) => {
      const filteredContacts = this.props.contacts.filter(item => item.lastName.includes(text));
      this.props.navigation.navigate('Contacts', { filteredContacts });
    }

    _didFocusSubscription;

    _willBlurSubscription;

    render() {
      let contacts = this.props.contacts;
      const backgroundActive = styles.textBackgroundActive;
      const backgroundInactive = styles.textBackgroundInactive;
      const textActive = styles.textActive;
      const textInactive = styles.textInactive;
      if (this.props.navigation.getParam('filteredContacts') !== undefined) {
        contacts = this.props.navigation.getParam('filteredContacts');
      }
      return (
        <View>
          <View>
            <SearchBar
              inputStyle={styles.containerStyleSearchBar}
              containerStyle={styles.containerStyleSearchBar}
              onChangeText={this.onSearch}
              placeholder="Rechercher un contact"
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                const filteredContacts = this.props.contacts;
                this.props.navigation.navigate('Contacts', { filteredContacts });
                this.setState({
                  activeAll: true,
                  activeFamily: false,
                  activeSenior: false,
                  activeMedical: false,
                  activeEmergency: false,
                });
              }}
            >
              <Text style={
                [styles.textStyle,
                  this.state.activeAll ? backgroundActive : backgroundInactive,
                  this.state.activeAll ? textActive : textInactive
                ]}
              >
                TOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const filteredContacts = this.props.contacts.filter(item => item.profile === 'FAMILLE');
                this.props.navigation.navigate('Contacts', { filteredContacts });
                this.setState({
                  activeAll: false,
                  activeFamily: true,
                  activeSenior: false,
                  activeMedical: false,
                  activeEmergency: false,
                });
              }}
            >
              <Text style={
                [styles.textStyle,
                  this.state.activeFamily ? backgroundActive : backgroundInactive,
                  this.state.activeFamily ? textActive : textInactive
                ]}
              >
                FAMILLE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const filteredContacts = this.props.contacts.filter(item => item.profile === 'SENIOR');
                this.props.navigation.navigate('Contacts', { filteredContacts });
                this.setState({
                  activeAll: false,
                  activeFamily: false,
                  activeSenior: true,
                  activeMedical: false,
                  activeEmergency: false,
                });
              }}
            >
              <Text style={
                [styles.textStyle,
                  this.state.activeSenior ? backgroundActive : backgroundInactive,
                  this.state.activeSenior ? textActive : textInactive
                ]}
              >
                SENIOR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const filteredContacts = this.props.contacts.filter(item => item.profile === 'MEDECIN');
                this.props.navigation.navigate('Contacts', { filteredContacts });
                this.setState({
                  activeAll: false,
                  activeFamily: false,
                  activeSenior: false,
                  activeMedical: true,
                  activeEmergency: false,
                });
              }}
            >
              <Text style={
                [styles.textStyle,
                  this.state.activeMedical ? backgroundActive : backgroundInactive,
                  this.state.activeMedical ? textActive : textInactive
                ]}
              >
                MEDECIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const filteredContacts = this.props.contacts
                  .filter(item => item.isEmergencyUser === true);
                this.props.navigation.navigate('Contacts', { filteredContacts });
                this.setState({
                  activeAll: false,
                  activeFamily: false,
                  activeSenior: false,
                  activeMedical: false,
                  activeEmergency: true,
                });
              }}
            >
              <Text style={
                [styles.textStyle,
                  this.state.activeEmergency ? backgroundActive : backgroundInactive,
                  this.state.activeEmergency ? textActive : textInactive
                ]}
              >
                URGENT
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.footerSpaceLastContact}
            data={contacts}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.onPressContact(item)}>
                <ContactItem
                  gravatar={item.gravatar}
                  firstName={item.firstName}
                  lastName={item.lastName}
                />
              </TouchableOpacity>
            )
            }
          />
        </View>
      );
    }
}

ContactsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  connectivity: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  contacts: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired,
    isFamilinkUser: PropTypes.bool.isRequired,
    isEmergencyUser: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  contactsError: PropTypes.string,
  loadContacts: PropTypes.func.isRequired,
  loadProfiles: PropTypes.func.isRequired,
  deleteAllContact: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  token: state.connect.token,
  contacts: state.contact.contacts,
  contactsError: state.contact.contactsError,
});
const mapDispatchToProps = dispatch => ({
  loadContacts: token => dispatch(loadContacts(token)),
  logoutUser: () => dispatch(logoutUser()),
  deleteAllContact: () => dispatch(deleteAllContact()),
  loadProfiles: () => dispatch(loadProfiles()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsScreen);
