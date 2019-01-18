import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  cellStyle: {
    height: 100,
    backgroundColor: '#FF6C00',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
  },
  imageSize: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginTop: 15,
  },
  textStyle: {
    color: '#FFF',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 15,
  },

});

const ContactItem = props => (
  <View style={styles.cellStyle}>
    <Image
      style={styles.imageSize}
      source={{ uri: props.gravatar }}
    />
    <View>
      <Text style={styles.textStyle}>{ props.firstName }</Text>
      <Text style={styles.textStyle}>{ props.lastName }</Text>
    </View>
  </View>
);

ContactItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default ContactItem;
