import {
    GET_FILM,
    GET_CURRENT_FILM,
    ITEMS_LOADING,
  } from '../actions/types';
  
  const initialState = {
    items: [],
    currentFilm: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FILM:
        return {
            ...state,
            items: action.payload,
            loading: false
        };
        case GET_CURRENT_FILM:
        console.log(action.payload)
        return {
            ...state,
            currentFilm: action.payload,
            loading: false
        };
        case ITEMS_LOADING:
            return {
            ...state,
            loading: true
      };
      default:
        return state;
    }
  }
  