import React, { Component } from 'react';
import {
    View, Button, StyleSheet, TouchableOpacity, FlatList, Text
} from 'react-native';
import ContactItem from '../component/ContactItem';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF6C00',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    backgroundGeneral: {
        backgroundColor: '#FECB98',
    },
});

export default class ContactsScreen extends Component {
    static navigationOptions =({navigation})=> ({
        headerTitle: 'Contacts',
        headerRight:(
             <TouchableOpacity onPress={() => navigation.navigate('CreateContact')}>
                <Text>ADD</Text>
            </TouchableOpacity>
      )
    });

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    phone: '0606060606',
                    firstName: 'Hubert',
                    lastName: 'Bonisseur de la batte',
                    email: 'test1@SpeechGrammarList.com',
                    profile: 'FAMILLE',
                    gravatar: 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2',
                    isEmergencyUser : false
                },
                {
                    phone: '0606060606',
                    firstName: 'test2',
                    lastName: 'test2',
                    email: 'test2@SpeechGrammarList.com',
                    profile: 'FAMILLE',
                    gravatar: 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2',
                    isEmergencyUser: false
                },
                {
                    phone: '0606060606',
                    firstName: 'test3',
                    lastName: 'test3',
                    email: 'test3@SpeechGrammarList.com',
                    profile: 'MEDECIN',
                    gravatar: 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2',
                    isEmergencyUser: false
                },
                {
                    phone: '0606060606',
                    firstName: 'test4',
                    lastName: 'test4',
                    email: 'test4@SpeechGrammarList.com',
                    profile: 'FAMILLE',
                    gravatar: 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2',
                    isEmergencyUser: false
                },
                {
                    phone: '0606060606',
                    firstName: 'test5',
                    lastName: 'test5',
                    email: 'test5@SpeechGrammarList.com',
                    profile: 'SENIOR',
                    gravatar: 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2',
                    isEmergencyUser: true
                },
                {
                    phone: '0606060606',
                    firstName: 'Hubert',
                    lastName: 'Bonisseur de la batte',
                    email: 'test1@SpeechGrammarList.com',
                    profile: 'FAMILLE',
                    gravatar: 'https://www.gravatar.com/avatar/ad014a4630fad95df1e5a61809e49cf2',
                    isEmergencyUser: true
                },
            ],
        };
        this.onPressContact = this.onPressContact.bind(this);
        this.onPressProfile = this.onPressProfile.bind(this);
    }

    onPressContact = (item) => {
        this.props.navigation.navigate('Detail', {
            firstName: item.firstName,
            lastName: item.lastName,
            phone: item.phone,
            email: item.email,
            gravatar: item.gravatar,
            isEmergencyUser: itemm.isEmergencyUser
        });
    }

    onPressProfile = (event) => {
        //filtrage sur le profil
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Button
                        onPress={this.onPressProfile}
                        title="TOUS"
                        color='#FF6C00'
                    />
                    <Button
                        onPress={this.onPressProfile}
                        title="FAMILLE"
                        color='#FF6C00'
                    />
                    <Button
                        onPress={this.onPressProfile}
                        title="SENIOR"
                        color='#FF6C00'
                    />
                    <Button
                        onPress={this.onPressProfile}
                        title="MEDECIN"
                        color='#FF6C00'
                    />
                    <Button
                        onPress={this.onPressProfile}
                        title="URGENT"
                        color='#FF6C00'
                    />
                </View>
                <FlatList
                    style={styles.backgroundGeneral}
                    data={this.state.data}
                    // keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.onPressContact(item)}>
                            <ContactItem gravatar={item.gravatar} firstName={item.firstName} lastName={item.lastName} />
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
        );
    }
}

ContactsScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    })
};
