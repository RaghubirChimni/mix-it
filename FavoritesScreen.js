import React, { useEffect } from 'react';
import { View, Text, Image} from 'react-native';
import { styles } from './Styles.js';

const FavoritesScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Favorites.</Text>
      </View>
    );
  };
  
  export default FavoritesScreen;