import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './Styles.js';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate to the next screen after a timeout of 4 seconds of the splash screen
      navigation.replace('MainStack');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Insert 'mix it' logo here.</Text>
    </View>
);
};

export default SplashScreen;