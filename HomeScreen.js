import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, Text, TouchableOpacity} from 'react-native';
import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites: []
    }
  }

    render(){
      return (
        <View style={{ marginTop: 50 }}>
          <Text>Try something new! (put row of random things)</Text>
          <Text>Try a favorite of yours.(put row of favorites)</Text>
          <Text>Because you favorited (insert drink)!</Text>
        </View>
      );
      }
  };
  
  export default HomeScreen;