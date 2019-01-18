import React, { Component } from 'react';
import {
  TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <Text>Ajouter</Text>
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
