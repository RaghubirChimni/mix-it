import React, { useEffect, useState, Component } from 'react';
import { View, Text, Image} from 'react-native';
import { styles } from './Styles.js';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SettingsScreen extends Component {

  state = {
    drink: false, 
    ingredient: false
  }

  async componentDidMount(){
    await this.receiveDrinkSetting();
    await this.receiveIngredientSetting();
  }

  receiveDrinkSetting = async () => {
    try{
      const drinkString = await AsyncStorage.getItem('drink');
      if(drinkString != null){
        const drinkStr  = JSON.parse(drinkString);
        this.setState({drink: drinkStr})
        console.log("set drink as " + drinkStr)
      }
      else{
        console.log("no drink")
      }
    }
    catch(e){
      console.log('failed retrieval of drink setting')
    }
  }

  receiveIngredientSetting = async () => {
    try{
      const ingredientString = await AsyncStorage.getItem('ingredient');
      if(ingredientString != null){
        const ingredientStr  = JSON.parse(ingredientString);
        this.setState({ingredient: ingredientStr})
        console.log("set ingredient as " + ingredientStr)
      }
      else{
        console.log("no ingredient")
      }
    }
    catch(e){
      console.log('failed retrieval of ingredient setting')
    }
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
        <View style = {{}}>
          <Text> Search By:</Text>
          <View style={{flexDirection:'row'}}>
            <CheckBox
              style = {{alignSelf: 'center'}}
              checked={this.state.drink}
              onPress={this.handleDrinkChange}
            />
            <Text>Drink</Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <CheckBox
                style = {{alignSelf: 'center'}}
                checked={this.state.ingredient}
                onPress={this.handleIngredientChange}
              />
            <Text>Ingredient</Text>
          </View>
        </View>
      );
  };
}
  export default SettingsScreen;