import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text, View, KeyboardAvoidingView, TouchableHighlight, StyleSheet, Image, Picker, Switch } from 'react-native';
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
      marginTop: 5,
      marginBottom: 15
    },
    logo: {
      width: 150,
      height: 150,
      margin: 30,
      marginBottom: 10,
    },
    text: {
      fontSize: 20
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


export default class CreateContactScreen extends Component {

    static navigationOptions = {
        title: 'Créer un contact',
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
        },
      };

  constructor(props) {
    super(props);

    this.state={
        lastname: '',
        firstname: '',
        phone: '',
        email: '',
        profil: 'famille',
        emergency: false
    }
  }


  render() {
    return (
        <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Image
          style={styles.logo}
          source={{ uri: 'http://www.startup-innovation.fr/img/empty.png' }}
        />
        <Text style={styles.text}>Nom</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Nom du contact'
          onChangeText={(value) => this.setState({lastname: value})}
        />
        <Text style={styles.text}>Prénom</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Prénom du contact'
          onChangeText={(value) => this.setState({firstname: value})}
        />
        <Text style={styles.text}>Numéro de téléphone</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Numéro de téléphone du contact'
          keyboardType='phone-pad'
          onChangeText={(value) => this.setState({phone: value})}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Adresse mail du contact'
          keyboardType='email-address'
          onChangeText={(value) => this.setState({email: value})}
        />
        
        <Text style={styles.text}>Avatar</Text>
        <TextInput
          style={styles.textInput}
          placeholder="URL de l'avatar du contact"
        />

        <Text style={styles.text}>Profil</Text>
        <Picker
            selectedValue={this.state.profil}
            prompt='Profil du contact'
            mode='dropdown'
            style={{height:40, width:250}}
            onValueChange={(itemValue, itemIndex) => this.setState({profil: itemValue})}>
            <Picker.Item label='Famille' color='#FF6C00' value='famille' />
            <Picker.Item label='Senior' color='#FF6C00' value='senior' />
            <Picker.Item label='Médecin' color='#FF6C00' value='médecin' />
        </Picker>

        <View style={{flexDirection:'row'}}>
            <Text style={styles.text}>Contacter en cas d'urgence </Text>
            <Switch 
                onValueChange={ (value) => this.setState({ emergency: value })} 
                value={ this.state.emergency }
                trackColor='#FF6C00' 
            /> 

        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => {
              
                this.props.navigation.navigate('Contacts');
              
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
      navigate: PropTypes.func.isRequired
    }),
  }
