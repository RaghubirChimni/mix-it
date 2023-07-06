import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DummyScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dummy.</Text>
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
  
  export default DummyScreen;