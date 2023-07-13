import React from 'react';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name = 'SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'MainStack' component={TabStackScreen} options={{headerShown: false, animation: 'none'}}/>
        <Stack.Screen name = "Search Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
)};

function TabStackScreen() {
  return (
    <Tab.Navigator initialRouteName = 'Main'>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, animation: 'none'}}/>
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{headerShown: false,}}/>
    </Tab.Navigator>
  );
}

export default App;