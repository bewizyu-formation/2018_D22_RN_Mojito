import React, { Component } from 'react';
import {
  Text, TextInput, View, Dimensions, StyleSheet, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '../store/connect.action';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FECB98',
    padding: 10,
    height: window.height,
    width: window.width,
  },
  primaryButton: {
    margin: 5,
    width: 250,
    height: 40,
    backgroundColor: '#FF6C00',
    marginBottom: 150,
  },
  textPrimaryButton: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 5,
  },
  textInput: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    margin: 5,
  },
  text: {
    fontSize: 20,
  },

});
export class ForgotPasswordScreen extends Component {
  static navigationOptions = {
    title: 'Mot de passe oublié',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Numéro de téléphone</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Entrer votre numéro de téléphone"
          keyboardType="phone-pad"
          value={this.state.phone}
          onChangeText={text => this.setState({ phone: text })}
        />
        <TouchableHighlight
          onPress={() => {
            if (this.props.connectivity) {
              if (this.state.phone.length !== 10) {
                alert('Numéro de téléphone invalide');
              } else {
                this.props.forgotPassword(this.state.phone)
                  .then(() => {
                    if (this.props.forgotError === undefined) {
                      console.log(forgotError);
                      alert('Votre mot de passe à bien été envoyé');
                      this.props.navigation.navigate('Login');
                    } else {
                      alert('Votre connexion Internet n\'est pas établie');
                    }
                  });
              }
            } else {
              alert('Pas de connexion internet');
            }
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.textPrimaryButton}>Renvoyer le mot de passe</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  connectivity: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  forgotError: PropTypes.string,
};

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  forgotError: state.connect.forgotError,
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: phone => dispatch(forgotPassword(phone)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
