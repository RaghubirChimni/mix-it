import React from 'react';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';
import SearchScreen from './SearchScreen';
import ItemScreen from './ItemScreen';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name = 'SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
          <Stack.Screen name = 'MainStack' component={TabStackScreen} options={{headerShown: false, animation: 'none'}}/>
          <Stack.Screen name = "Search Settings" component={SettingsScreen} />
          <Stack.Screen name = "Item Screen" component={ItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
)};

function TabStackScreen() {
  return (
    <Tab.Navigator initialRouteName = 'Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home'; // Change 'home' to the name of your home icon.
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search'; // Change 'search' to the name of your search icon.
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-o'; // Change 'star' and 'star-o' to the name of your favorite icons.
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      
      tabBarActiveTintColor: 'darkorange', // Change the active tab color
      tabBarInactiveTintColor: 'gray', // Change the inactive tab color
      tabBarStyle: { display: 'flex' }, // Change other tab bar styles if needed
      })}

    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, animation: 'none'}}/>
      <Tab.Screen name="Search" component={SearchScreen} options={{headerShown: false,}}/>
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{headerShown: false,}}/>
    </Tab.Navigator>
  );
}

export default App;