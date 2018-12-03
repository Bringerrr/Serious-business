import {
    USER_AUTH,
    USER_REG,
    USER_SAVE_FILM,
    ITEMS_LOADING,
  } from '../actions/types';
  
  const initialState = {
    checkUser:'',
    userInfo:[],
    userData:[],
    saveFilm:[],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case USER_SAVE_FILM:
        console.log(action.payload)
        return {
            ...state,
            saveFilm: action.payload,
            loading: false
        };
        case USER_AUTH:
        console.log(action.payload)
        return {
            ...state,
            userData: action.payload,
            loading: false
        };
        case USER_REG:
        console.log(action.payload)
        return {
            ...state,
            userInfo: action.payload,
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
  