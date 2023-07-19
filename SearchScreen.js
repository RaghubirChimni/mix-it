import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, Text, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import { styles } from './Styles.js';
import { SearchBar, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { receiveIngredientSetting, receiveDrinkSetting, receiveFavorites, handleFavoritesButton } from './Utils.js';


class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      drink: false, 
      ingredient: false,
      favorites: [],
      anyResults: false, 
      resultsToDisplay: [],
    }
    this.timeoutId = null;
  }

async componenetDidMount(){
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
        
        this.setState({ drink: await receiveDrinkSetting() });
        this.setState({ ingredient: await receiveIngredientSetting() });
        this.setState({favorites: await receiveFavorites()});

        if(this.state.query.length == 1)
          end = "search.php?f=" + this.state.query
        else{
          // clear the previous results before new API call
          this.setState({ anyResults: false });
          this.setState({ resultsToDisplay: [] });

          // if searching by ingredient, then end = "search.php?i=" + query
          // if searching by cocktail name, then end = "search.php?s=" + query
          // if both then combine search results
          if (this.state.ingredient && !this.state.drink){
            end = "filter.php?i=" + this.state.query;
            await this.callAPIIngredients(base+end, 0);
          }
          else if (this.state.drink && !this.state.ingredient){
            end = "search.php?s=" + this.state.query;
            await this.callAPIDrinks(base+end, 0);
          }
          else{
            end = "search.php?s=" + this.state.query;
            await this.callAPIDrinks(base+end, 3);

            end1 = "filter.php?i=" + this.state.query;
            await this.callAPIIngredients(base+end1, 3);

          }
        }
      }

    }, 1000); // Adjust the timeout duration as needed
  }

  callAPIIngredients = async (endpoint, numToReturn) => {
    console.log("callAPIIngredients")
    console.log(endpoint)
    await fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      let origQuery = data;
      console.log('fetch done with no error');
      // console.log(data)

      let n = 0
      if(data["drinks"] == null)
        this.setState({anyResults: false})
      else{
        console.log('results')
        this.setState({anyResults: true})

        if (numToReturn == 0)
          n = Math.min(data["drinks"].length, 10);
        else
          n = Math.min(numToReturn, data["drinks"].length)

        console.log(n.toString())
      
      }

      for (let i = 0; i < n; i++){
        let drinkID = origQuery["drinks"][i]['idDrink'] // get important fields from each result and put in state
        console.log(drinkID)
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID)
        .then((response) => response.json())
        .then((data) => {
          s =  data["drinks"][0];
          drinkResult = {
            "idDrink": s["idDrink"], 
            "strDrink": s["strDrink"], 
            "strAlcoholic": s["strAlcoholic"], 
            "strInstructions": s["strInstructions"],
            "strDrinkThumb": s["strDrinkThumb"] + "/preview"
          } 
          console.log("created drinkResult")
          // add appropriate num of ingredients and measurements
  
          for(let j = 1; j <= 15; j++){
            let ing = "strIngredient" + j.toString()
            let measure = "strMeasure"+ j.toString()
            if(s[ing] == null){
              print("no ingredient"+toString(i))
              break;
            }
            else{
              drinkResult[ing] = s[ing];
              drinkResult[measure] = s[measure];
              print("added drink")
              drinkResult["numIngredients"] = j
            }
          }
  
          console.log(drinkResult)
          this.setState((prevState) => ({
            resultsToDisplay: [...prevState.resultsToDisplay, drinkResult]
          }));
        }).catch(error => {
          console.log(error)
        });
        

        // break;
      }
    
    })
    .catch(error => {
      console.log(error)
    });
  };

  callAPIDrinks = async (endpoint, numToReturn) => {

    console.log(endpoint)
    await fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log('fetch done with no error');

      let n = 0
      if(data["drinks"] == null)
        this.setState({anyResults: false})
      else{
        this.setState({anyResults: true})

        if (numToReturn == 0)
          n = Math.min(data["drinks"].length, 10);
        else
          n = Math.min(numToReturn, data["drinks"].length)

        console.log(n.toString())
      
      }

      for (let i = 0; i < n; i++){
        s = data["drinks"][i] // get important fields from each result and put in state
        console.log(Object.keys(s))

        drinkResult = {
          "idDrink": s["idDrink"], 
          "strDrink": s["strDrink"], 
          "strAlcoholic": s["strAlcoholic"], 
          "strInstructions": s["strInstructions"],
          "strDrinkThumb": s["strDrinkThumb"] + "/preview"
        } 
        console.log("created drinkResult")
        // add appropriate num of ingredients and measurements

        for(let j = 1; j <= 15; j++){
          let ing = "strIngredient" + j.toString()
          let measure = "strMeasure"+ j.toString()
          if(s[ing] == null){
            print("no ingredient"+toString(i))
            break;
          }
          else{
            drinkResult[ing] = s[ing];
            drinkResult[measure] = s[measure];
            print("added drink")
            drinkResult["numIngredients"] = j
          }
        }

        console.log(drinkResult)
        this.setState((prevState) => ({
          resultsToDisplay: [...prevState.resultsToDisplay, drinkResult]
        }));
        // break;
      }
    
    })
    .catch(error => {
      console.log(error)
    });
  };

  handleSearch = (query) => {
    this.setState({query: query});
  };

  SettingsButton = ({onPress}) => {
    return(
      <TouchableOpacity onPress={onPress}>
        <Icon name="cog" size={35} color="black" />
      </TouchableOpacity>
    );
  };

  handleSettingsButton = () => {
    console.log("pressed")
    const {navigation} = this.props
    navigation.navigate("Search Settings");
  }


  Item = ({item}) => (
    <View style={style.item}>
      <TouchableOpacity style={style.title} onPress={
        () => {
          const {navigation} = this.props
          navigation.navigate("Item Screen", {itemToDisplay: item});
        }
      }>
        <Text>{item.strDrink}</Text>
        <Image style={{width: 50,height: 50,}} source={{uri: item.strDrinkThumb}} />
        <View>
          <TouchableOpacity onPress={async () => this.setState({favorites: await handleFavoritesButton(item.idDrink)})}>
          <Icon name="star" size={35} color={ this.state.favorites.includes(item.idDrink) ? "gold" : "gray"} />
          </TouchableOpacity>
        </View>
      
      </TouchableOpacity>

    </View>
  );

  results = () => {
    if (this.state.anyResults == true){
      console.log("returning flatlist")
      console.log(this.state.resultsToDisplay)
      return(
        <FlatList
          data={this.state.resultsToDisplay}
          renderItem={this.Item}
          keyExtractor={item => item.idDrink}
        />
      );
    }
    else{
      console.log("no results")
      return(
        <Text>Drink Something New!</Text>
      );
    }
    
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
            <this.SettingsButton 
              onPress={this.handleSettingsButton}
            />
          </View>
          {this.results()}
          {/* <this.results/> */}
        </View>
      );
      }
  };


  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      flexDirection: 'wrap',
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
  export default SearchScreen;