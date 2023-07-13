import React, { useEffect, useState, useRef } from 'react';
import { View, Pressable, Text, TouchableOpacity} from 'react-native';
import { styles } from './Styles.js';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
  const [query, setQuery] = useState('')

  // need to only search after whole query is written
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Search query:', query);

      // if not empty, then make an API request
      if(query != ""){
        // check the filter settings and make the request
        let base = "www.thecocktaildb.com/api/json/v1/1/"
        let end = ""

        if(query.length == 1)
          end = "search.php?f=" + query
        else{
          // if searching by ingredient, then end = "search.php?i=" + query
          // if searching by cocktail name, then end = "search.php?s=" + query
          // if both then combine search results
        }

        // make request(s) with base+end
      }
      

    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (query) => {
    setQuery(query);
  };

  const IconButton = ({onPress}) => {
    return(
      <TouchableOpacity onPress={onPress}>
        <Icon name="cog" size={35} color="black" />
      </TouchableOpacity>
    );
  };

  const handleButtonPress = () => {
    console.log("pressed")
    navigation.navigate("Search Settings");
  }

    // need to position searchbar to be at top of screen
    return (
      <View style={{ marginTop: 50 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 50  }}>
          <SearchBar 
            containerStyle={{ flex: 1, marginRight: 10 }}
            placeholder="Hope you're thirsty!"
            lightTheme='default'
            onChangeText={handleSearch}
            value={query}
          />
          <IconButton 
            onPress={handleButtonPress}
          />
        </View>
      </View>
    );
  };
  
  export default HomeScreen;