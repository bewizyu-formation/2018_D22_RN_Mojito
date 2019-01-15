import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import DetailScreen from './DetailScreen';
import CreateAccountScreen from './CreateAccountScreen';
import ContactsScreen from './ContactsScreen';
import CreateContactScreen from './CreateContactScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
    Contacts: ContactsScreen,
    Detail: DetailScreen,
    CreateContact: CreateContactScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: 'Contacts',
  },
);

export const AppContainer = createAppContainer(AppNavigator);
