import React, { Component } from 'react';
import {
  View, Button, StyleSheet, TouchableOpacity, FlatList, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactItem from '../component/ContactItem';
import { logoutUser } from '../store/connect.action';
import { loadContacts, deleteAllContact, loadProfiles } from '../store/contact.action';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6C00',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backgroundGeneral: {
    backgroundColor: '#FECB98',
  },
});

class ContactsScreen extends Component {
    static navigationOptions =({ navigation }) => ({
      headerTitle: 'Contacts',
      headerRight: (
        <TouchableOpacity onPress={() => {
          if (this.props.connectivity) {
            navigation.navigate('CreateContact');
          } else {
            alert('Pas de connexion internet');
          }
        }}
        >
          <Text>ADD</Text>
        </TouchableOpacity>
      ),
    });

    constructor(props) {
      super(props);

      this.onPressContact = this.onPressContact.bind(this);
    }

    componentDidMount() {
      if (this.props.connectivity) {
        this.props.loadContacts(this.props.token)
          .then(() => {
            if (this.props.contactsError !== undefined) {
              alert('Votre session a expiré');
              this.props.logoutUser();
              this.props.deleteAllContact();
              this.props.navigation.navigate('Login');
            } else {
              this.props.loadProfiles();
            }
          });
      } else {
        alert('Pas de connexion internet');
      }
    }

    onPressContact = (item) => {
      this.props.navigation.navigate('Detail', {
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
        email: item.email,
        gravatar: item.gravatar,
        isEmergencyUser: item.isEmergencyUser,
      });
    }


    render() {
      let contacts = this.props.contacts;
      if (this.props.navigation.getParam('filteredContacts') !== undefined) {
        contacts = this.props.navigation.getParam('filteredContacts');
      }
      return (
        <View>
          <View style={styles.container}>
            <Button
              onPress={() => {
                const filteredContacts = this.props.contacts;
                this.props.navigation.navigate('Contacts', { filteredContacts });
              }}
              title="TOUS"
              color="#FF6C00"
            />
            <Button
              onPress={() => {
                const filteredContacts = this.props.contacts.filter(item => item.profile === 'FAMILLE');
                this.props.navigation.navigate('Contacts', { filteredContacts });
              }}
              title="FAMILLE"
              color="#FF6C00"
            />
            <Button
              onPress={() => {
                const filteredContacts = this.props.contacts.filter(item => item.profile === 'SENIOR');
                this.props.navigation.navigate('Contacts', { filteredContacts });
              }}
              title="SENIOR"
              color="#FF6C00"
            />
            <Button
              onPress={() => {
                const filteredContacts = this.props.contacts.filter(item => item.profile === 'MEDECIN');
                this.props.navigation.navigate('Contacts', { filteredContacts });
              }}
              title="MEDECIN"
              color="#FF6C00"
            />
            <Button
              onPress={() => {
                const filteredContacts = this.props.contacts
                  .filter(item => item.isEmergencyUser === true);
                this.props.navigation.navigate('Contacts', { filteredContacts });
              }}
              title="URGENT"
              color="#FF6C00"
            />
          </View>
          <FlatList
            style={styles.backgroundGeneral}
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
