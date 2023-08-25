import React, { useEffect, useState, Component } from 'react';
import { View, Text, Image} from 'react-native';
import { styles } from './Styles.js';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { receiveIngredientSetting, receiveDrinkSetting } from './Utils.js';

class SettingsScreen extends Component {

  state = {
    drink: false, 
    ingredient: false
  }

  async componentDidMount(){
    receiveDrinkSetting().then((drinkSetting) => {
      this.setState({ drink: drinkSetting });
    });
    receiveIngredientSetting().then((ingredientSetting) => {
      this.setState({ ingredient: ingredientSetting });
    });
  }


  handleDrinkChange = async () => {
    // save in storage
    try{
      await this.setState({drink: !this.state.drink})
      const drinkString = JSON.stringify(this.state.drink);
      await AsyncStorage.setItem('drink', drinkString);
  
      console.log('drink setting saved as: ' + drinkString)
    } catch (e) {
      console.log('error saving drink setting')
    }
  }

  handleIngredientChange = async () => {
    // save in storage
    try{
      await this.setState({ingredient: !this.state.ingredient})
      const ingredientString = JSON.stringify(this.state.ingredient);
      await AsyncStorage.setItem('ingredient', ingredientString);
      console.log('ingredient saved as ' + ingredientString)
    } catch (e) {
      console.log('error saving ingredient setting')
    }
  }

    render(){
      return (
        <View style = {{flex:1}}>
          <Text style={styles.text}>Search By:</Text>
          <View style={{flexDirection:'row', alignItems: 'baseline'}}>
            <CheckBox
              size={30}
              style = {styles.checkbox}
              checked={this.state.drink}
              onPress={this.handleDrinkChange}
              checkedColor="#accbb4" // Customize the checked color
              uncheckedColor="black" // Customize the unchecked color
            />
            <Text style={[styles.text, {fontSize: 25}, {paddingTop: 0}]}>Drink</Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <CheckBox
                size={30}
                style = {styles.checkbox}
                checked={this.state.ingredient}
                onPress={this.handleIngredientChange}
                checkedColor="#accbb4" // Customize the checked color
                uncheckedColor="black" // Customize the unchecked color
              />
            <Text style={[styles.text, {fontSize: 25}, {paddingTop: 0}]}>Ingredient</Text>
          </View>
        </View>
      );
  };
}
  export default SettingsScreen;