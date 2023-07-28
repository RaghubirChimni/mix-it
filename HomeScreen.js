import React, { useEffect, useState, Component } from 'react';
import { View, Pressable, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites: [], 
      new_things: [], 
      recommendations: []
    }
  }


  async componentDidMount(){
    // call the API

  }



  Item = ({item}) =>  (
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

    render(){
      return (
        <View style={{ marginTop: 50 }}>

          <Text style={[styles.text, {fontSize: 20}]}>Try something new!</Text>
          <FlatList
            data={this.state.new_things}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
          />

          <Text style={[styles.text, {fontSize: 20}]}>Because you favorited (insert drink)!</Text>
          <FlatList 
            data={this.state.new_things}
            renderItem={this.Item}
            keyExtractor={item => item.idDrink}
            horizontal={true}
          />
        </View>
      );
      }
  };
  
  export default HomeScreen;