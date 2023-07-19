import React, { useEffect, useState, Component, useContext } from 'react';
import { View, Pressable, Text, TouchableOpacity} from 'react-native';
import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'

class ItemScreen extends Component {
  constructor(props){
    super(props);
  }

    render(){
    const { itemToDisplay } = this.props.route.params;
      return (
        <View style={{ marginTop: 50 }}>
          <Text>{itemToDisplay["strDrink"]}</Text>
        </View>
      );
      }
  };
  
  export default ItemScreen;