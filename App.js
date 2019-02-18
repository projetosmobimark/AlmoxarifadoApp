
import React from 'react';
import HomeScreen from './src/HomeScreen.js'
import Login from './src/telas/Login.js'
import Historico from './src/Historico.js'
import ProfileScreen from './src/ProfileScreen.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {createSwitchNavigator,createStackNavigator, createAppContainer, createBottomTabNavigator,} from 'react-navigation';

import { Provider } from 'react-redux';
import { Store } from './src/store';

import TelaTeste from './src/TelaTeste.js'


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const testeStack = createStackNavigator({ TelaTeste: TelaTeste });
const AppStack = createStackNavigator({ Home: HomeScreen, Historico: Historico, Profile: ProfileScreen });
const AuthStack = createStackNavigator({ SignIn: Login });

const AppNavigation = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Testes: testeStack,
  },
  {
    initialRouteName: 'Testes',
  }
));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <AppNavigation />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


