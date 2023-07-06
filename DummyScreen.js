import React, { useEffect } from 'react';
import { View, Text, Image} from 'react-native';
import { styles } from './Styles.js';

const DummyScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dummy.</Text>
      </View>
    );
  };
  
  export default DummyScreen;