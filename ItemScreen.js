import React, { useEffect, useState, Component, useContext } from 'react';
import { View, Pressable, Text, Image, StyleSheet} from 'react-native';
// import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'

// will be used for all of the items when they are clicked on.
// work on formatting this
// Image, Title, Alcoholic or not, ingredients + measurements, etc.
class ItemScreen extends Component {
  constructor(props){
    super(props);
  }

    render(){
    const { itemToDisplay } = this.props.route.params;
      return (
        <View style={styles.container}>
        <Image style={styles.image} source={{ uri: itemToDisplay.strDrinkThumb }} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{itemToDisplay.strDrink}</Text>
        </View>
      </View>
      );
      }
  };
  
  export default ItemScreen;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Center horizontally
    },
    image: {
      width: 300,
      height: 300,
      marginTop: 10,
      borderRadius: 10,
    },
    textContainer: {
      marginVertical: 10,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'DancingScript-Regular'
    },
  });