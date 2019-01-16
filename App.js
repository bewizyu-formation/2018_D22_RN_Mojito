import React, {Component} from 'react';
import ConnectContainer from './src/component/ConnectContainer';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {connectReducer} from './src/store/connect.reducer';
import {contactReducer} from './src/store/contact.reducer';

// Assemblage des différents reducers d'une application
const reducers = combineReducers({
  connect: connectReducer,
  contact: contactReducer,
});
const logger = createLogger({
  level: 'log',
});

// Création du store
const store = createStore(reducers, applyMiddleware(thunk,logger));

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <ConnectContainer/>
      </Provider>
    );
  }
}


