import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { deleteContact, deleteAllContact } from '../store/contact.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../store/connect.action';

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
  },
  backgroundGeneral: {
      backgroundColor: '#FECB98',
  },
  textStyle: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 10
  },
  textStyleIdentity: {
    color: '#FFF',
    fontSize: 25,
    marginBottom: 5
  },
  iconAlignement:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  footerIcons:{
    position:'absolute',bottom:0, alignSelf: 'center',
    backgroundColor: '#FECB98',
  },
  iconSpacing: {
    display: 'flex',
    flexDirection: 'row'
  },
  marginRight30:{
    marginRight: 30
  },
  imageStyle:{
    height: 48,
    width: 48,
    marginTop: 50
  },
  imageStyleNoGravatar:{
    height: 200,
    width: 200
  },
  imageStyleGravatar:{
    alignItems:'center',
    justifyContent:'center',
    width: 180,
    height: 180,
    borderRadius:100,
    marginTop: 20
  },
  imageStyleBottom:{
    height: 80,
    width: 80
  }
});
export class DetailScreen extends Component {
  static navigationOptions =({navigation})=> ({
    headerTitle: 'Détails',
  });

  constructor(props) {
    super(props);
  }

  disconnectUser(){
    this.props.logoutUser();
    this.props.deleteAllContact();
    this.props.navigation.navigate('Login');
  }

  render() {
    const { navigation } = this.props;
    const firstName = navigation.getParam('firstName', 'Un prénom');
    const lastName = navigation.getParam('lastName', 'Un nom');
    const phone = navigation.getParam('phone', 'Un numéro');
    const email = navigation.getParam('email', 'Un email');
    const profile = navigation.getParam('profile', 'Un groupe');
    const _id = navigation.getParam('id','un id');
    const gravatar = navigation.getParam('gravatar',null);
    const isEmergencyUser = navigation.getParam('isEmergencyUser',false);

    let imageUser = '';

    if(gravatar !== null){
      let image = { uri: gravatar };
      imageUser = <Image style={ styles.imageStyleGravatar } source= { image }/>
    }else{
      imageUser= <Image style={ styles.imageStyleNoGravatar } source= {require('../../assets/user-icon.png')}/>
    }
    console.log('id contact : ',_id);
    
    return (
      <View style={[{flex:1}, styles.backgroundGeneral]}>
        <View style={[styles.iconAlignement]}>
        <TouchableOpacity 
          onPress={
            () => 
              {if (this.props.connectivity) {
                this.props.deleteContact(this.props.token, _id)
                .then(
                  () => {
                    if (this.props.deleteError !== undefined) {
                      alert('Votre session a expiré');
                      this.disconnectUser();
                    }else{
                      navigation.navigate('Contacts');
                    }
                  }
                ) 
              }else{
                alert('Vous n\'êtes pas connecté à Internet')
                this.disconnectUser();
              }
            }
            }>
          <Image style={styles.imageStyle} source={require('../../assets/trash-icon.png')}/>

          </TouchableOpacity>
          <TouchableOpacity>
            {imageUser}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreateContact', {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            gravatar: gravatar,
            profile: profile,
            isEmergencyUser: isEmergencyUser,
            id: _id
          })}>
            <Image style={styles.imageStyle} source={require('../../assets/edit-icon.png')}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.container, styles.backgroundGeneral]}>
          <Text style={ styles.textStyleIdentity }>{ firstName }</Text>
          <Text style={ styles.textStyleIdentity }>{ lastName }</Text>
          <Text style={ styles.textStyle }>{ phone }</Text>
          <Text style={ styles.textStyle }>{ email }</Text>
          <Text style={ styles.textStyle }>{ profile }</Text>
        </View>
        <View style={styles.footerIcons}>
          <View style={styles.iconSpacing}>
          <TouchableOpacity onPress={() => Linking.openURL(`sms:${phone}`)}>
            <Image style={ styles.imageStyleBottom} source={require('../../assets/sms-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)} title="email test">
            <Image style={ styles.imageStyleBottom} source={require('../../assets/email-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Image style={ styles.imageStyleBottom} source={require('../../assets/phone-icon.png')}/>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

DetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  connectivity: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
  deleteAllContact: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  token: state.connect.token,
  deleteError: state.connect.deleteError
});

const mapDispatchToProps = dispatch => ({
  deleteContact: (token, _id) => dispatch(deleteContact(token, _id)),
  logoutUser: () => dispatch(logoutUser()),
  deleteAllContact: () => dispatch(deleteAllContact()),
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen)
