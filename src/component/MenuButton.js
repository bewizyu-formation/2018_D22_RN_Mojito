import React, { Component } from 'react';
import {
  TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const image = require('../../assets/gearing-icon.png');

const styles = StyleSheet.create({
  image: {
    height: 34,
    width: 34,
  },
});
export default class MenuButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('Menu');
      }}
      >
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
    );
  }
}

MenuButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
