import React, { useEffect, useState, Component, useContext } from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView} from 'react-native';
// import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'
import {Font} from 'expo'
import { Divider } from '@rneui/themed';
import { styles } from './Styles.js';


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
        <View style={styles.itemPageContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>

          <Image style={styles.image} source={{ uri: itemToDisplay.strDrinkThumb }} />
          <View style={styles.textContainer}>
            <Text style={styles.itemPageTitle}>{itemToDisplay.strDrink}</Text>
            <Text style={styles.itemPageAdditionalText}>{itemToDisplay.strAlcoholic}</Text>
          </View>

          <View style={styles.divider}/>
          <Text style={styles.section_title}>Ingredients:</Text>  
              {get_measurements_ingredients()}

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