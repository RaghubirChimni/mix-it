import React, { useEffect, useState, Component, useContext } from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView} from 'react-native';
// import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'
import {Font} from 'expo'
import { Divider } from '@rneui/themed';

// will be used for all of the items when they are clicked on.
// work on formatting this
// Image, Title, Alcoholic or not, ingredients + measurements, etc.
class ItemScreen extends Component {
  constructor(props){
    super(props);

  }

  // put custom components for ingredients + measurements

    render(){
      const { itemToDisplay } = this.props.route.params;

      get_measurements_ingredients = () => {
        const results = [];
        let numIngredients = parseInt(itemToDisplay.numIngredients)
        for(let i = 1; i <= numIngredients; i++){
          results.push(
            <Text key={i} >
              {itemToDisplay["strMeasure" + i.toString()]}
              {itemToDisplay["strIngredient" + i.toString()]}
            </Text>
          );
        }

        return results;
      }

      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>

          <Image style={styles.image} source={{ uri: itemToDisplay.strDrinkThumb }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{itemToDisplay.strDrink}</Text>
            <Text style={styles.additionalText}>{itemToDisplay.strAlcoholic}</Text>
          </View>

          <View style={styles.divider}/>
          <Text style={styles.section_title}>Ingredients:</Text>  
              {get_measurements_ingredients()}

         
          <Text></Text>
          <View style={styles.divider}/>
          <Text style={styles.section_title}>How to Make it:</Text>  
          <Text style={styles.instructions}>{itemToDisplay.strInstructions}</Text>  
         


        <Text></Text>



        </ScrollView>
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
    scrollContainer: {

    },
    image: {
      width: 300,
      height: 300,
      marginTop: 10,
      borderRadius: 10,
      alignSelf: 'center', // Center the image within its container

    },
    textContainer: {
      marginVertical: 10, 
      flexDirection: 'row',
      alignItems: 'baseline', // Add this line to align the heights
      marginBottom: 4
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    instructions: {
      fontSize: 15,
      width: 350,
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: 'gray',
      marginVertical: 10,
    },
    section_title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 10,
    },
    additionalText: {
      fontSize: 15,
      color: "gray",
      marginLeft: 10,
    },
  });