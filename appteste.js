
import React from 'react';
import HomeScreen from './src/HomeScreen.js'
import Login from './src/telas/Login.js'
import Historico from './src/Historico.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, createAppContainer, createBottomTabNavigator,} from 'react-navigation';





const TabNavigator = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Historico: {screen: Historico},
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-cafe';
         
        } else if (routeName === 'Historico') {
          iconName = 'md-calendar';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }

);

export default createAppContainer(TabNavigator);

/*const MainNavigator = createStackNavigator({
  
  Home: {screen: HomeScreen},
  Historico: {screen: Historico},
});

const App = createAppContainer(MainNavigator);

export default App;*/