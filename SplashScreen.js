import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './Styles.js';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate to the next screen after a timeout of 4 seconds of the splash screen
      navigation.replace('MainStack');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container,]}>
      <Image
        source={require('./mix-it.png')}
        style={{    flex: 1,
          width: '100%', // Adjust as needed
          height: '100%', // Adjust as needed
          justifyContent: 'center', // Adjust content vertically if needed
          alignItems: 'center', // Adjust content horizontally if needed
        }}
      />
    </View>
);
};

export default SplashScreen;