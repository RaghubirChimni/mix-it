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
        source={require('./mix-it_logo2_update.png')}
        style={{ width: 500, height: 500, resizeMode: 'contain' }}
      />
    </View>
);
};

export default SplashScreen;