import React, { Component } from 'react';
import { NetInfo, View } from 'react-native';
import { AppContainer } from '../screen/StackNavigator';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {easycallReducer} from '../store/easycall.reducer';

// Assemblage des différents reducers d'une application
const reducers = combineReducers({
  easycall: easycallReducer,
});
const logger = createLogger({
  level: 'log',
});

// Création du store
const store = createStore(reducers, applyMiddleware(thunk,logger));

export default class ConnectContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: undefined,
    };
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ connected: isConnected });
    })
      .catch();
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }


  handleConnectivityChange(isConnected) {
    isConnected ? this.setState({ isConnected: true }) : this.setState({ isConnected: false });
  }

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}
