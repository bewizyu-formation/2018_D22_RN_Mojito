import React, { Component } from 'react';
import { NetInfo, View } from 'react-native';
import { AppContainer } from '../screen/StackNavigator';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { updateConnectivity } from '../store/connect.action';

export class ConnectContainer extends Component {
  constructor(props) {
    super(props);

    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange(isConnected) {
    this.props.updateConnectivity(isConnected);
  }

  render() {
      return (
        <AppContainer />
      )
  }
}

ConnectContainer.propTypes = {
  connectivity: PropTypes.bool.isRequired,
  updateConnectivity: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  connectivity: state.connect.connectivity,
});
const mapDispatchToProps = dispatch => ({
  updateConnectivity: connectivity => dispatch(updateConnectivity(connectivity)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectContainer)