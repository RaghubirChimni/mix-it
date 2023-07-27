import React, { createContext, useReducer, useContext } from 'react';

const GlobalStateContext = createContext();

const initialState = {
  favorites: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);


// TO DO:
// 1. USE GLOBAL STATE FOR FAVORITES - will help with synchronicity of favorites list
    // 1. make this class, wrap the App.js with it
    // 2. adjust the Util.js functions to accomodate for global state
    // 3. adjust the classes with local state for favorites
    // 4. Test the Favorites <-> Search pg, when each other unfavorites

// 2. Home Screen
    // 1. API Calls
    // 2. Horizontal FlatLists
    // 3. Formatting

// 3. Item Screen - if drink name is too long, will run off the screen and mess up the format