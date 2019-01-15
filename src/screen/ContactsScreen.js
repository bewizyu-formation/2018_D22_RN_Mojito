import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import ContactItem from '../component/ContactItem';

const windowWidth = Dimensions.get('window').width;
export default class ContactsScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            backgroundColorButton: '#FF6C00',
            data: [
            {
                'phone': '0606060606',
                'firstName': 'Hubert',
                'lastName': 'Bonisseur de la batte',
                'email': 'test1@SpeechGrammarList.com',
                'profile': 'FAMILLE',
                'gravatar': 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2'
            },
            {
                'phone': '0606060606',
                'firstName': 'test2',
                'lastName': 'test2',
                'email': 'test2@SpeechGrammarList.com',
                'profile': 'FAMILLE',
                'gravatar': 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2'
            },
            {
                'phone': '0606060606',
                'firstName': 'test3',
                'lastName': 'test3',
                'email': 'test3@SpeechGrammarList.com',
                'profile': 'MEDECIN',
                'gravatar': 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2'
            },
            {
                'phone': '0606060606',
                'firstName': 'test4',
                'lastName': 'test4',
                'email': 'test4@SpeechGrammarList.com',
                'profile': 'FAMILLE',
                'gravatar': 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2'
            },
            {
                'phone': '0606060606',
                'firstName': 'test5',
                'lastName': 'test5',
                'email': 'test5@SpeechGrammarList.com',
                'profile': 'SENIOR',
                'gravatar': 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2'
            },
            {
                'phone': '0606060606',
                'firstName': 'Hubert',
                'lastName': 'Bonisseur de la batte',
                'email': 'test1@SpeechGrammarList.com',
                'profile': 'FAMILLE',
                'gravatar': 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2'
            },
            ],
        }
        this.onPressContact = this.onPressContact.bind(this);
        this.onPressCategory = this.onPressCategory.bind(this);
    }
    static navigationOptions = {
      headerTitle: 'Contacts',
    };

    onPressContact = (item) => {
        this.props.navigation.navigate('Detail', {
            firstName: item.firstName,
            lastName: item.lastName
        });
    }

    onPressCategory = (event) => {
        console.log(event.target.title);
        this.setState({
            
        });
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                <Button
                    onPress={this.onPressCategory}
                    title='TOUS'
                    color={ this.state.backgroundColorButton }
                />
                <Button
                    onPress={this.onPressCategory}
                    title='FAMILLE'
                    color={ this.state.backgroundColorButton }
                />
                <Button
                    onPress={this.onPressCategory}
                    title='SENIOR'
                    color={ this.state.backgroundColorButton }
                />
                <Button
                    onPress={this.onPressCategory}
                    title='MEDECIN'
                    color={ this.state.backgroundColorButton }
                />
                <Button
                    onPress={this.onPressCategory}
                    title='URGENT'
                    color={ this.state.backgroundColorButton }
                />
                </View>
                <FlatList
                    style= {styles.backgroundGeneral}
                    data={this.state.data}
                    //keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => <TouchableOpacity /*key={index}*/ onPress={()=>this.onPressContact(item)}>
                    <ContactItem gravatar={ item.gravatar } firstName={ item.firstName } lastName= { item.lastName }/>
                </TouchableOpacity>
                }
               />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF6C00',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }, 
    backgroundGeneral: {
        backgroundColor : '#FECB98'
    },
});
