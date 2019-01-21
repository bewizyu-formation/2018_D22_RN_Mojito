import React, { Component } from 'react';
import {
  TouchableOpacity, Text, Image, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  imageStyle:{
    height: 48,
    width: 48,
  },
})

class AddButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {
        if (this.props.connectivity) {
          this.props.navigation.navigate('CreateContact');
        } else {
          alert('Pas de connexion internet');
        }
      }}
      >
        <Image style={styles.imageStyle} source={require('../../assets/plus-icon.png')}/>
      </TouchableOpacity>
    );
  }
}

AddButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  connectivity: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,

});
const mapDispatchToProps = dispatch => ({

});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddButton);
