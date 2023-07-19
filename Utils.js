import AsyncStorage from '@react-native-async-storage/async-storage';

export const receiveIngredientSetting = async () => {
    try{
      const ingredientString = await AsyncStorage.getItem('ingredient');
      if(ingredientString != null){
        const ingredientStr  = JSON.parse(ingredientString);
        // this.setState({ingredient: ingredientStr})
        console.log("set ingredient as " + ingredientStr)
        return ingredientStr;
      }
      else{
        console.log("no ingredient")
        return false;
      }
    }
    catch(e){
      console.log('failed retrieval of ingredient setting')
      return false;
    }
}


export const receiveDrinkSetting = async () => {
    try{
      let drinkString = await AsyncStorage.getItem('drink');
      if(drinkString != null){
        const drinkStr  = JSON.parse(drinkString);
        // this.setState({drink: drinkStr})
        console.log("set drink as " + drinkStr)
        return drinkStr;
      }
      else{
        console.log("no drink")
        return false;
      }
    }
    catch(e){
      console.log(e)
      console.log('failed retrieval of drink setting')
      return false;
    }
  }


export const  receiveFavorites = async () => {
    try{
      const f = await AsyncStorage.getItem('favorites');
      if(f != null){
        const favStr  = JSON.parse(f);
        // this.setState({favorites: favStr})
        console.log("set favorites as " + favStr)
        return favStr
      }
      else{
        console.log("no favorites")
        return [];
      }
    }
    catch(e){
      console.log('failed retrieval of drink setting')
      console.log(e)
    }
  }