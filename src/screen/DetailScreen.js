import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { deleteContact } from '../store/contact.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  imageStyleGravatar:{
    height: 200,
    width: 200
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

  render() {
    const { navigation } = this.props;
    const firstName = navigation.getParam('firstName', 'Un prénom');
    const lastName = navigation.getParam('lastName', 'Un nom');
    const phone = navigation.getParam('phone', 'Un numéro');
    const email = navigation.getParam('email', 'Un email');
    const profile = navigation.getParam('profile', 'Un groupe');
    const _id = navigation.getParam('_id','un id');
    return (
      <View style={[{flex:1}, styles.backgroundGeneral]}>
        <View style={[styles.iconAlignement]}>
        <TouchableOpacity 
          onPress={
            () => 
              {if (this.props.connectivity) {
                this.props.deleteContact(this.props.token, _id) 
              }else{
                alert('Vous n\'êtes pas connecté à Internet')
              }
            }
            }>
            <Image style={styles.imageStyle} source={require('../assets/trash-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.imageStyleGravatar} source={require('../assets/user-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreateContact', {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            gravatar: gravatar,
            profile: profile,
            isEmergencyUser: isEmergencyUser
          })}>
            <Image style={styles.imageStyle} source={require('../assets/edit-icon.png')}/>
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
            <Image style={ styles.imageStyleBottom} source={require('../assets/sms-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)} title="email test">
            <Image style={ styles.imageStyleBottom} source={require('../assets/email-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Image style={ styles.imageStyleBottom} source={require('../assets/phone-icon.png')}/>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

DetailScreen.propTypes = {
  deleteContact: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
  token: state.connect.token
});

const mapDispatchToProps = dispatch => ({
  deleteContact: title => dispatch(deleteContact(this.props.token, _id)),
  loadFormations: () => dispatch(loadFormations()),
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen)
