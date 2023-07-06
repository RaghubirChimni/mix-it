import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import DummyScreen from './DummyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name = 'SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'MainStack' component={TabStackScreen} options={{headerShown: false, animation: 'none'}}/>
      </Stack.Navigator>
    </NavigationContainer>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function TabStackScreen() {
  return (
    <Tab.Navigator initialRouteName = 'Main'>
      <Tab.Screen name="Main" component={MainScreen} options={{headerShown: false, animation: 'none'}}/>
      <Tab.Screen name="Dummy" component={DummyScreen} options={{headerShown: false,}}/>
    </Tab.Navigator>
  );
}

export default App;