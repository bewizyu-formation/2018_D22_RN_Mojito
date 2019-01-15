import React, { Component } from "react";
import { AppContainer } from '../screen/StackNavigator'
import { NetInfo, View } from 'react-native';


export default class ConnectContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: undefined,
        }
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then((isConnected) => {
            this.setState({ connected: isConnected })
        })
            .catch((error) => {
                console.error(error);
            })
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }


    handleConnectivityChange(isConnected) {
        isConnected ? this.setState({ isConnected: true }) : this.setState({ isConnected: false })
    }

    render() {
        return (
            <AppContainer />
        )
    }
}