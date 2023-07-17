import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, Text, TouchableOpacity} from 'react-native';
import { styles } from './Styles.js';
import { SearchBar, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      drink: false, 
      ingredient: false,
      favorites: [], 
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
        let base = "https://www.thecocktaildb.com/api/json/v1/1/"
        let end = ""
        let end1 = ""
        
        await this.receiveDrinkSetting();
        await this.receiveIngredientSetting();
        

        if(this.state.query.length == 1)
          end = "search.php?f=" + this.state.query
        else{
          // if searching by ingredient, then end = "search.php?i=" + query
          // if searching by cocktail name, then end = "search.php?s=" + query
          // if both then combine search results
          if (this.state.ingredient && !this.state.drink)
            end = "filter.php?i=" + this.state.query;
          else if (this.state.drink && !this.state.ingredient)
            end = "search.php?s=" + this.state.query;
          else{
            end = "search.php?s=" + this.state.query;
            end1 = "filter.php?i=" + this.state.query;
          }
        }
        console.log(base+end)

        // do the API endpoint call, sort data & put in cards in a list view
        if(end1 == ""){
          // get all possible results
          await this.callAPI(base+end, 0);
          
        }
        else{
          // do both calls, get 3 results
          await this.callAPI(base+end, 3);
          await this.callAPI(base+end1, 3);
        }
      }
      

    }, 1000); // Adjust the timeout duration as needed
  }

  callAPI = async (endpoint, numToReturn) => {
    console.log(endpoint)
    await fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log('fetch done with no error');

      // add results to card and put on page
      if (numToReturn == 0){
        for (let i = 0; i < data["drinks"].length; i++){
          s = data["drinks"][i]
          console.log(s)
          break;
        }
      }
    })
    .catch(error => {
      console.log(error)
    });
  };

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
  
  export default SearchScreen;