import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, Text, TouchableOpacity} from 'react-native';
import { styles } from './Styles.js';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      drink: false, 
      ingredient: false
    }
    this.timeoutId = null;
  }

    render(){
      return (
        <View style={{ marginTop: 50 }}>
          <Text>Try something new!</Text>
          <Text>Try a favorite of yours.</Text>
          <Text>Because you liked Gin. (etc.)</Text>
        </View>
      );
      }
  };
  
  export default HomeScreen;