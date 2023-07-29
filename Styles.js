import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemPageContainer:{
      flex: 1,
      alignItems: 'center', // Center horizontally
    },
    text: {
      fontFamily: 'Cochin',
      fontSize: 38,
      paddingTop: 30, 
      alignSelf: 'center'
    },
    searchContainer: {
      flex: 1,
      alignItems: 'center' 
    },
    searchBar:{
      flex: 1, 
      marginRight: 10,  
      marginTop: 50,  
    },
    item: {
      flexDirection: 'row', // Align items in a row (horizontally)
      justifyContent: 'flex-start', // Align items to the left within the item
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 0,
      width: '95%', // Set the parent container width to 100% of the screen width
      alignItems: 'center',
      borderRadius: 10,
    },
    itemTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      flex: 1,
      flexDirection: 'row',
      marginLeft: 10,
      marginBottom: 10, 
      fontFamily: 'Cochin'
    },
    starContainer: {
      marginLeft: 'auto',
      width: 50, 
      alignItems: 'center',
    },
    drinkImage: {
      width: 100,
      height: 100,
      marginRight: 10, // Add some space between the image and text
      borderRadius: 20,
    },
    itemInfo: {
      flex: 1,
      flexDirection: "column", // Align the components vertically
      marginBottom: 50, 
    },
    additionalTextItem: {
      fontSize: 12,
      color: "gray",
      marginTop: -10,
      marginLeft: 10, 
      fontFamily: 'Cochin'
    },

    scrollContainer: {

    },
    image: {
      width: 300,
      height: 300,
      marginTop: 10,
      borderRadius: 10,
      alignSelf: 'center', // Center the image within its container

    },
    textContainer: {
      marginVertical: 10, 
      flexDirection: 'row',
      alignItems: 'baseline', // Add this line to align the heights
      marginBottom: 4
    },
    itemPageTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      flexShrink: 1, 
      fontFamily: 'Cochin'
    },
    instructions: {
      fontSize: 15,
      width: 350,
      fontFamily: 'Cochin'
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: 'gray',
      marginVertical: 10,
    },
    section_title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 10,
      fontFamily: 'Cochin'
    },
    itemPageAdditionalText: {
      fontSize: 15,
      color: "gray",
      marginLeft: 10,
      fontFamily: 'Cochin'
    },
    itemHomePage: {
      flexDirection: 'row', // Align items in a row (horizontally)
      justifyContent: 'flex-start', // Align items to the left within the item
      backgroundColor: '#ffffff',
      paddingHorizontal: 5, // Horizontal padding
      paddingVertical: 5, // Vertical padding
      marginVertical: 5, // Vertical margin
      marginLeft: 5, // Left margin
      marginRight: 5, // Right margin
      width: 250, // Set the parent container width to 100% of the screen width
      height: '30%',
      alignItems: 'center',
      borderRadius: 10,
    },
    
    drinkImageHomeItem: {
      width: 60,
      height: 60,
      marginRight: 5, // Add some space between the image and text
      borderRadius: 20,
      alignSelf: 'center'
    },
    homeItemTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      // flex: 1,
      marginLeft: -7,
      marginBottom: -10, 
      padding: 20,
      flexWrap: 'wrap', 
      fontFamily: 'Cochin'
    },
    itemHomeInfo: {
      flex: 1,
      flexDirection: "column",
      fontFamily: 'Cochin'
    },
    additionalTextHomeItem: {
      fontSize: 12,
      color: "gray",
      marginBottom: 5,
      marginLeft: 14,
      fontFamily: 'Cochin'
    },

  });

