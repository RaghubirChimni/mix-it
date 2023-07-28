import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, Text, TouchableOpacity, FlatList, Image, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'
import { receiveFavorites, handleFavoritesButton} from './Utils.js';


class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites: [], 
      new_things: [], 
      new_things_if_no_favorites: [],
      recommendations_based_on_favorites: [],
      anyRecs: false, 
      drinkName: ''
    }
  }


  async componentDidMount(){
    this.props.navigation.addListener('focus', this.onScreenFocus);
    await this.updateFavorites(); // Call updateFavorites when the component mounts
    this.recs_based_on_favs();
  }

  async componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.onScreenFocus);
  }

  onScreenFocus = async () => {
    await this.updateFavorites(); // Call updateFavorites when the screen comes into focus
  }

  updateFavorites = async () => {
    try {
      console.log("updated favorites");
      this.setState({ favorites: await receiveFavorites()});
    } catch (error) {
      console.log('Error fetching favorites:', error);
    }
  };


  Item = ({item}) =>  (
    <View style={styles.itemHomePage}>
      <TouchableOpacity style={styles.itemTitle} onPress={
          () => {
            const {navigation} = this.props
            navigation.navigate("Item Screen", {itemToDisplay: item});
          }
        }>
        <Image style={styles.drinkImageHomeItem} source={{uri: item.strDrinkThumb}} />
        <View style ={styles.itemHomeInfo}>
          <Text style={styles.homeItemTitle} numberOfLines={2}>{item.strDrink}</Text>
          <Text style={styles.additionalTextHomeItem} numberOfLines={1}>{item.strAlcoholic}</Text>
          <Text style={styles.additionalTextHomeItem}>{item.strIngredient1}</Text>
        </View>

        </TouchableOpacity>

        <View style={styles.starContainer}>
          <TouchableOpacity onPress={async () => this.setState({favorites: await handleFavoritesButton(item.idDrink)})}>
          <Icon name="star" size={25} color={ this.state.favorites.includes(item.idDrink) ? "gold" : "gray"} />
          </TouchableOpacity>
        </View>
      
    </View>
  );

  recs_based_on_favs = async () => {
    let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/'
    if(this.state.favorites.length == 0){
      // give random recs
      endpoint += 'random.php'
      this.setState({new_things_if_no_favorites: []})
      await this.callAPI(endpoint, 'new_things_if_no_favorites', '')
          // return component afterwards
    }
    else{ // give recs based on type of alc
      let favoriteChosen = Math.floor(Math.random()*this.state.favorites.length);
      let drinkID = this.state.favorites[favoriteChosen]

      // call API to get strIngredient1
      let ingredient = ''
      let drinkName = ''
      await fetch(endpoint + 'lookup.php?i=' + drinkID)
      .then((response) => response.json())
      .then((data) => {
        ingredient = data['drinks'][0]['strIngredient1']
        drinkName = data['drinks'][0]['strDrink']

        console.log("ingrdient used to recommend: " + ingredient)
      }).catch(error => {
        console.log(error)
      });

      // endpoint search by ingredient: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
      endpoint += "filter.php?i=" + ingredient
      // then callAPI() with endpoint and recommendations_based_on_favorites as arguments
      this.setState({recommendations_based_on_favorites: []})
      await this.callAPI(endpoint, 'recommendations_based_on_favorites', drinkID);
      this.setState({anyRecs: true});
      this.setState({drinkName: drinkName})
        // return component afterwards
    }
  }

  callAPI = async (endpoint, arrayKeyToPutResults, drinkID) => { // calls API at endpoint and stores in corresponding state array
    console.log('home page callAPI: ' + arrayKeyToPutResults)
    console.log(arrayKeyToPutResults);
    console.log(this.state[arrayKeyToPutResults]); // Log the updated state here

    // return;
    await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        let origQuery = data;
        let n = 0
        if(data["drinks"] != null){

          n = Math.min(7, data["drinks"].length)

          console.log(n.toString())
          console.log(data['drinks'])
          
          for (let i = 0; i < n; i++){
            
            let dID = origQuery["drinks"][i]['idDrink'] // get important fields from each result and put in state
            console.log('id: ' + dID)
            if(drinkID != dID){
              fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + dID)
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                s =  data['drinks'][0];
                console.log(s['idDrink']);
                let drinkResult = {
                  "idDrink": s["idDrink"], 
                  "strDrink": s["strDrink"], 
                  "strAlcoholic": s["strAlcoholic"], 
                  "strInstructions": s["strInstructions"],
                  "strDrinkThumb": s["strDrinkThumb"] + "/preview"
                }
                for(let j = 1; j <= 15; j++){
                  let ing = "strIngredient" + j.toString()
                  let measure = "strMeasure"+ j.toString()
                  if(s[ing] == null){
                    print("no ingredient"+i.toString())
                    break;
                  }
                  else{
                    drinkResult[ing] = s[ing];
                    drinkResult[measure] = s[measure];
                    print("added drink")
                    drinkResult["numIngredients"] = j
                  }
                }

                this.setState((prevState) => ({
                  [arrayKeyToPutResults]: [...prevState[arrayKeyToPutResults], drinkResult]
                }));
                
          });
        }
      }
    }

     }).catch(error => {
        console.log(error);
      });
  }

  recs_component = () => {
    if(this.state.favorites.length == 0){
      return(
        <View style={{flex:1}}>
          <FlatList 
            data={this.state.new_things_if_no_favorites}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
          />
        </View>
      );
    }
    else{
      // return component afterwards
      return(
        <View style={{flex:1}}>
          <Text style={[styles.text, {fontSize: 20, paddingBottom: 10}]}>Because you favorited {this.state.drinkName}!</Text>
          <FlatList 
            data={this.state.recommendations_based_on_favorites}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
            
            />
        </View>
      );
    }
  }

    render(){
      return (
        <View style={{ marginTop: 50, flex:1 }}>

          <Text style={[styles.text, {fontSize: 20}]}>Try something new!</Text>
          <FlatList
            data={this.state.new_things}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
          />
          <View style={{flex:1}}>
            {this.recs_component()}

          </View>
        </View>
      );
      }
  };
  
  export default HomeScreen;