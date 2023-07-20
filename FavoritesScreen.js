import React, { Component, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { receiveFavorites, handleFavoritesButton } from './Utils.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';



class FavoritesScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      favorites: [],
      resultsToDisplay: [],

    }
  }

  async componentDidMount() {
    await this.updateFavorites();
    this.props.navigation.addListener('focus', this.onScreenFocus);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.onScreenFocus);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      await this.updateFavorites();
    }
  }

onScreenFocus = async () => {
  await this.updateFavorites();
  }

  updateFavorites = async () => {
    try {
      const favorites = await receiveFavorites();
      this.setState({ favorites }, () => {
        this.getFavoritesInfo();
      });
    } catch (error) {
      console.log('Error fetching favorites:', error);
    }
  };


  getFavoritesInfo = async () => {
    this.setState({ resultsToDisplay: [] });
    for(let i = 0; i < this.state.favorites.length; i++){
      let endpoint = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + this.state.favorites[i]
      await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        s = data["drinks"][0]
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
    }
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
    if (this.state.favorites.length != 0){
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
      <View style={styles.container}>
        <Text style={styles.text}>Favorites.</Text>
        {this.results()}
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
  
  export default FavoritesScreen;