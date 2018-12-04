import {
    USER_AUTH,
    USER_REG,
    USER_SAVE_FILM,
    USER_DEL_FILM,
    USER_SIGN_OUT,
    ITEMS_LOADING,
    USER_DASHBOARD,
  } from '../actions/types';
  
  const initialState = {
    checkUser:'',
    userInfo:[],
    userData:[],
    saveFilm:[],
    authorized:false,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case USER_DASHBOARD:
        console.log(action.payload)
        if(!action.payload){
            return {
                ...state,
                authorized:false,
                loading: false
            };
        }
        return {
            ...state,
            userData: action.payload,
            authorized:true,
            loading: false
        };
        case USER_SIGN_OUT:
        return {
            ...state,
            userData: [],
            authorized:false,
            loading: false
        };
        case USER_DEL_FILM:
        return {
            ...state,
            loading: false
        };
        case USER_SAVE_FILM:
        return {
            ...state,
            saveFilm: action.payload,
            loading: false
        };
        case USER_AUTH:
        return {
            ...state,
            userData: action.payload,
            loading: false
        };
        case USER_REG:
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
  