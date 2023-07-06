import React, { useEffect } from 'react';
import { View, Text, Image} from 'react-native';
import { styles } from './Styles.js';

const MainScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Main Screen.</Text>
      </View>
    );
  };
  
  export default MainScreen;