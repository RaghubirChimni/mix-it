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

  componenetDidMount(){
    this.performSearch();
  }

  componentDidUpdate(_, prevState){
    if (prevState.query !== this.state.query) {
      clearTimeout(this.timeoutId);
      this.performSearch();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
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
      console.log(e)
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

  // need to only search after whole query is written
  async performSearch(){
    this.timeoutId = setTimeout(async () => {
      console.log('Search query:', this.state.query);

      // if not empty, then make an API request
      if(this.state.query != ""){
        // check the filter settings and make the request
        let base = "www.thecocktaildb.com/api/json/v1/1/"
        let end = ""
        
        await this.receiveDrinkSetting();
        await this.receiveIngredientSetting();
        

        if(this.state.query.length == 1)
          end = "search.php?f=" + this.state.query
        else{
          // if searching by ingredient, then end = "search.php?i=" + query
          // if searching by cocktail name, then end = "search.php?s=" + query
          // if both then combine search results
        }

        // make request(s) with base+end
      }
      

    }, 1000); // Adjust the timeout duration as needed
  }

  handleSearch = (query) => {
    this.setState({query: query});
  };

  IconButton = ({onPress}) => {
    return(
      <TouchableOpacity onPress={onPress}>
        <Icon name="cog" size={35} color="black" />
      </TouchableOpacity>
    );
  };

  handleButtonPress = () => {
    console.log("pressed")
    const {navigation} = this.props
    navigation.navigate("Search Settings");
  }

    render(){
      return (
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 50  }}>
            <SearchBar 
              containerStyle={{ flex: 1, marginRight: 10 }}
              placeholder="Hope you're thirsty!"
              lightTheme='default'
              onChangeText={this.handleSearch}
              value={this.state.query}
            />
            <this.IconButton 
              onPress={this.handleButtonPress}
            />
          </View>
        </View>
      );
      }
  };
  
  export default HomeScreen;