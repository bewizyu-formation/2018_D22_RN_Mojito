import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class ContactItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={ styles.cellStyle}>
                <Image
                    style={styles.imageSize}
                    source={{uri: this.props.gravatar}}
                />
                <View>
                  <Text style={styles.textStyle}>{ this.props.firstName }</Text>
                  <Text style={styles.textStyle}>{ this.props.lastName }</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    cellStyle: {
        height: 100,
        backgroundColor: '#FF6C00',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
        marginTop: 5,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000'
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
        marginTop: 15
    }
    
});

ContactItem.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired
}