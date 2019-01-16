import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, Alert, TextInput, Text, View, KeyboardAvoidingView, TouchableHighlight, StyleSheet, Image, Picker, Switch } from 'react-native';
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
      marginTop: 5
    },
    logo: {
      width: 150,
      height: 150,
      margin: 30,
      marginBottom: 10,
    },
    text: {
      fontSize: 20,
      marginTop:15
    },
    textAlert:{
        color: "red"
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
        lastnameEmpty: false,
        firstname: '',
        firstnameEmpty: false,
        phone: '',
        invalidPhone: false,
        email: '',
        invalidEmail: false,
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
          onBlur={() => {
            if(this.state.lastname.length === 0){
                this.setState({lastnameEmpty: true});
            }else {
                this.setState({lastnameEmpty: false});
            }
        }}
        />
        {this.state.lastnameEmpty? (
            <Text style={styles.textAlert}>Le nom du contact doit être renseigné</Text>
        ):(
            null
        )
        }

        <Text style={styles.text}>Prénom</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Prénom du contact'
          onChangeText={(value) => this.setState({firstname: value})}
          onBlur={() => {
            if(this.state.firstname.length === 0){
                this.setState({firstnameEmpty: true});
            }else {
                this.setState({firstnameEmpty: false});
            }
        }}
        />
        {this.state.firstnameEmpty? (
            <Text style={styles.textAlert}>Le prénom du contact doit être renseigné</Text>
        ):(
            null
        )
        }


        <Text style={styles.text}>Numéro de téléphone</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Numéro de téléphone du contact'
          keyboardType='phone-pad'
          onChangeText={(value) => this.setState({phone: value})}
        onBlur={() => {
            if(this.state.phone.length !== 10){
                this.setState({invalidPhone: true});
            }else {
                this.setState({invalidPhone: false});
            }
        }}
        />
        {this.state.invalidPhone? (
            <Text style={styles.textAlert}>Numéro de téléphone invalide</Text>
        ):(
            null
        )
        }

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Adresse mail du contact'
          keyboardType='email-address'
          onChangeText={(value) => this.setState({email: value})}
          onBlur={() => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(this.state.email) === false)
            {
                this.setState({invalidEmail: true});
            }
            else {
                this.setState({invalidEmail: false});
            }
        }}
        />
        {this.state.invalidEmail? (
            <Text style={styles.textAlert}>Le format de l'adresse mail n'est pas valide</Text>
        ):(
            null
        )
        }
        
        
        <Text style={styles.text}>Avatar</Text>
        <TextInput
          style={styles.textInput}
          placeholder="URL de l'avatar du contact"
        />

        <Text style={styles.text}>Profil</Text>
        {Platform.OS === "android" ? (
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
        ):(
            null
        )}
        

        <View style={{flexDirection:'row'}}>
            <Text style={styles.text}>Contacter en cas d'urgence </Text>
            <Switch 
                onValueChange={ (value) => this.setState({ emergency: value })}
                style={{marginTop:15, marginLeft:10, transform: Platform.OS=== 'android'?[{ scaleX: 1.5 }, { scaleY: 1.5 }]:[{ scaleX: 1 }, { scaleY: 1 }] }} 
                value={ this.state.emergency }
            /> 

        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => {

                if(this.state.lastname !== '' && this.state.firstname !== '' 
                    && this.state.phone !== '' && !this.state.invalidPhone 
                    && this.state.email !== '' && !this.state.invalidEmail){
                    this.props.navigation.navigate('Contacts');
                } else {
                    Alert.alert("Création impossible","Un ou plusieurs champs sont mal renseignés");
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
      navigate: PropTypes.func.isRequired
    }),
  }
