import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MainScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Main Screen.</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Cochin',
      fontSize: 50,
    },
  });
  
  export default MainScreen;