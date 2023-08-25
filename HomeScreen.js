import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, ImageBackground, Text, TouchableOpacity, FlatList, Image, ScrollView, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './Styles.js';
import { receiveFavorites, handleFavoritesButton, arraysAreEqual } from './Utils.js';


class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites: [], 
      new_things: [], 
      new_things_if_no_favorites: [],
      new_things_if_no_favorites2: [],
      recommendations_based_on_favorites: [],
      recommendations_based_on_favorites2: [],
      anyRecs: false, 
      drinkName1: '',
      drinkName2: '',
      refreshing: false, 
      on_start: true,
    }
  }


  async componentDidMount(){
    this.props.navigation.addListener('focus', this.onScreenFocus);
    await this.updateFavorites(); // Call updateFavorites when the component mounts
    await this.callAPIRandomRecs('new_things');
    this.setState({on_start: false})
  }

  async componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.onScreenFocus);
  }

  onScreenFocus = async () => {
    if(!this.state.on_start)
      await this.updateFavorites(); // Call updateFavorites when the screen comes into focus
  }

  updateFavorites = async () => {
    try {
      console.log('updateFavorites() called')
      console.log("updated favorites");
      const prevFavorites = this.state.favorites;
      const newFavorites = await receiveFavorites();
      if (!arraysAreEqual(prevFavorites, newFavorites)) { // Compare arrays directly
        this.setState({ favorites: newFavorites });
        console.log('called recs_based_on_favs')
        await this.recs_based_on_favs();
      }
      else if(this.state.on_start){
        await this.recs_based_on_favs();
      }
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
          <TouchableOpacity onPress={async () => {
            await handleFavoritesButton(item.idDrink);
            this.updateFavorites();
          }}>
          <Icon name="star" size={25} color={ this.state.favorites.includes(item.idDrink) ? "gold" : "gray"} />
          </TouchableOpacity>
        </View>
      
    </View>
  );

  recs_based_on_favs = async () => {
    console.log('recs_based_on_favs()')

    let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/'
    if(this.state.favorites.length == 0){
      // give random recs
      console.log('random recs')
      endpoint += 'random.php'
      this.setState({new_things_if_no_favorites: []})
      this.setState({new_things_if_no_favorites2: []})
      await this.callAPIRandomRecs('new_things_if_no_favorites')
      await this.callAPIRandomRecs('new_things_if_no_favorites2')
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
      // then callAPI() with endpoint and recommendations_based_on_favorites as arguments
      this.setState({recommendations_based_on_favorites: []})
      this.setState({drinkName1: drinkName})
      await this.callAPIPersonalRecs(endpoint + 'filter.php?i=' + ingredient, 'recommendations_based_on_favorites', drinkID);
      // return component afterwards

      // next favorite chosen
      if (this.state.favorites.length > 1){
        console.log("choosing next favorite")
        let nextChosen = Math.floor(Math.random()*this.state.favorites.length);
        while(nextChosen == favoriteChosen){
          nextChosen = Math.floor(Math.random()*this.state.favorites.length);
        }
        console.log('chosen')
        let drinkID2 = this.state.favorites[nextChosen];
        let ingredient1 = ''
        let drinkName2 = ''
        await fetch(endpoint + 'lookup.php?i=' + drinkID2)
        .then((response) => response.json())
        .then((data) => {
          ingredient1 = data['drinks'][0]['strIngredient1']
          drinkName2 = data['drinks'][0]['strDrink']
  
          console.log("ingrdient used to recommend: " + ingredient)
        }).catch(error => {
          console.log(error)
        });
        let endpoint2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient1;

        this.setState({recommendations_based_on_favorites2: []})
        this.setState({drinkName2: drinkName2})
        await this.callAPIPersonalRecs(endpoint2, 'recommendations_based_on_favorites2', drinkID2);

      }
    }
  }

  idDrinkInside = (idDrink, arrayKeyToPutResults) => {
    for (let i = 0; i < this.state[arrayKeyToPutResults].length; i++) {
      if (this.state[arrayKeyToPutResults][i]['idDrink'] == idDrink) {
        console.log('idDrinkInside returned true')
        return true;
      }
      // console.log(this.state[arrayKeyToPutResults][i]['idDrink'])
    }
    console.log('idDrinkInside returned false')
    return false;
  }

  callAPIPersonalRecs = async (endpoint, arrayKeyToPutResults, drinkID) => { // calls API at endpoint and stores in corresponding state array
    console.log('callAPIPersonalRecs()')
    let origQuery = null;
    // return;
    await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        origQuery = data; 
      });
        // let n = 0
      if(origQuery != null){
        let n = Math.min(7, origQuery["drinks"].length)
        console.log('min: ' + n.toString())
        
        for (let i = 0; i < n; i++){
          let dID = origQuery["drinks"][i]["idDrink"] // get important fields from each result and put in state
          console.log('i: ' + i.toString() + ' id: ' + dID)
          if(!this.idDrinkInside(dID, arrayKeyToPutResults) && !this.state.favorites.includes(dID)){
            fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + dID)
            .then((response) => response.json())
            .then((data) => {
              // console.log(data)
              s =  data['drinks'][0];
              // console.log(s['idDrink']);
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
              console.log('drinkId to add: ' + s['idDrink'])
              this.setState((prevState) => ({
                [arrayKeyToPutResults]: [...prevState[arrayKeyToPutResults], drinkResult]
              }));
                
          });
        }
      }
      console.log('callAPIPersonalRecs done')
      // console.log(this.state[arrayKeyToPutResults])
    }

  }


  callAPIRandomRecs = async (arrayKeyToPutResults) => {
    let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    let n = 7

    this.setState({[arrayKeyToPutResults]: []})
    
    for(let i = 0; i < n; i++){
      fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        s = data['drinks'][0]
        // look at this line
        if(!this.state.favorites.includes(s['idDrink']) && !this.idDrinkInside(s['idDrink'], 'new_things') && !this.idDrinkInside(s['idDrink'], 'new_things_if_no_favorites') && !this.idDrinkInside(s['idDrink'], 'new_things_if_no_favorites2')){

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
        }
        else{
          i--;
        }
      }).catch(error => {
        console.log(error);
      });
    }

  } 



  random_new_items_component = () => {
    return(
      <View style={{flex:1}}>
        <Text style={[styles.text, {fontSize: 25, paddingBottom: 15}]}>Try something new!</Text>
        <FlatList 
          data={this.state.new_things}
          renderItem={this.Item}
          keyExtractor={item => item.idDrink}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  recs_component = () => {
    // console.log('recs_component')
    if(this.state.favorites.length == 0){
      // if(this.state.new_things_if_no_favorites.length == 0)
      // console.log('this.state.favorites.length == 0')
      // console.log(this.state.new_things_if_no_favorites)
      return(
        <View style={{flex:1}}>
          <Text style={[styles.text, {fontSize: 25, paddingBottom: 15}]}>
            Some Exciting Drinks!
          </Text>
          <FlatList 
            data={this.state.new_things_if_no_favorites}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style = {{paddingBottom: 20}}
          />
          <FlatList 
            data={this.state.new_things_if_no_favorites2}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }
    else{
      // return component afterwards
      // console.log('this.state.favorites.length != 0)')
      if(this.state.favorites.length == 1){
        return(
          <View style={{flex:1}}>
            <Text style={[styles.text, {fontSize: 25, paddingBottom: 15}]}>Because you favorited {this.state.drinkName1}!</Text>
            <FlatList 
              data={this.state.recommendations_based_on_favorites}
              renderItem={this.Item}
              keyExtractor={item => item.idDrink}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              />
          </View>
        );
      }
      else{
        return(
          <View style={{flex:1}}>
            <Text style={[styles.text, {fontSize: 25, paddingBottom: 15}]}>Because you favorited {this.state.drinkName1}!</Text>
            <FlatList 
              data={this.state.recommendations_based_on_favorites}
              renderItem={this.Item}
              keyExtractor={item => item.idDrink}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              />
          <Text style={[styles.text, {fontSize: 25, paddingBottom: 15}]}>Because you favorited {this.state.drinkName2}!</Text>
            <FlatList 
              data={this.state.recommendations_based_on_favorites2}
              renderItem={this.Item}
              keyExtractor={item => item.idDrink}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              />
          </View>
        );
      }

    }
  }

  refresh = async () => {
    console.log('refresh() called')
    this.setState({refreshing: true})

    await this.callAPIRandomRecs('new_things');
    this.recs_based_on_favs();

    this.setState({refreshing: false})
  }

    render(){
      return (
        <View style={{ flex: 1 }}>
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

          {/* <ImageBackground
            source={require('./back.png')}
            style={{
              position: 'absolute',
              bottom: -70,
              left: 0,
              width: '100%',
              height: '80%',
              justifyContent: 'flex-end',
              paddingVertical: 30, 
              marginLeft: 90
            }}
            imageStyle={{
              resizeMode: "cover", 
              alignSelf: "flex-end", 
              top: undefined
            }}
          >
          </ImageBackground>


          <ImageBackground
            source={require('./back.png')}
            style={{
              position: 'absolute',
              bottom: -97,
              right: 0,
              width: '100%',
              height: '80%',
              justifyContent: 'flex-end',
              paddingVertical: 30, 
              marginRight: 90
            }}
            imageStyle={{
              resizeMode: "cover", 
              alignSelf: "flex-end", 
              top: undefined, 
            }}
          >
          </ImageBackground> */}


          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={this.refresh}
              />
            }
          >
            <View style={{ flex: 1, marginTop: 50 }}>
              {this.random_new_items_component()}
              {this.recs_component()}
            </View>
          </ScrollView>
        </View>

      );
    }
  };
  
  export default HomeScreen;