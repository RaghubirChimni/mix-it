import React, { Component, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { styles } from './Styles.js';
import { receiveFavorites, handleFavoritesButton, arraysAreEqual } from './Utils.js';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      const newFavorites = await receiveFavorites();
      const prevFavorites = this.state.favorites;
      if (!arraysAreEqual(prevFavorites, newFavorites)) { // Compare arrays directly
        this.setState({ favorites: newFavorites });
        await this.getFavoritesInfo();
      }
    } catch(error){
      console.log(error)
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
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemTitle} onPress={
          () => {
            const {navigation} = this.props
            navigation.navigate("Item Screen", {itemToDisplay: item});
          }
        }>
        <Image style={styles.drinkImage} source={{uri: item.strDrinkThumb}} />
        <View style ={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.strDrink}</Text>
          <Text style={styles.additionalTextItem} numberOfLines={1}>{item.strAlcoholic}</Text>
        </View>

        </TouchableOpacity>

        <View style={styles.starContainer}>
          <TouchableOpacity onPress={async () => this.setState({favorites: await handleFavoritesButton(item.idDrink)})}>
          <Icon name="star" size={25} color={ this.state.favorites.includes(item.idDrink) ? "gold" : "gray"} />
          </TouchableOpacity>
        </View>
      
    </View>
  );

  results = () => {
    if (this.state.favorites.length != 0){
      console.log("returning flatlist")
      // console.log(this.state.resultsToDisplay)
      return(
        <View>
          <Text style={[styles.text, {paddingTop: 70, paddingBottom: 15}]}>Favorites.</Text>
          <FlatList
            data={this.state.resultsToDisplay}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
          />
        </View>
      );
    }
    else{
      console.log("no results")
      return(
        <View>
          <Text style={[styles.text, {paddingTop: 70, paddingBottom: 20}]}>Try Something New!</Text>
        </View>
      );
    }
    
  }

  render(){
    return (
      <View style={styles.itemPageContainer}>
         <ImageBackground
            source={require('./homepage.png')}
            style={{
              position: 'absolute',
              bottom: -10,
              width: '100%',
              height: '90%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: -200

            }}
            imageStyle={{
              resizeMode: "cover", 
              alignSelf: "flex-end", 
              top: undefined
            }}
          >
          </ImageBackground>
        {this.results()}
       
      </View>
    );
    }
  };

  export default FavoritesScreen;