import {
    GET_USER_EXIST,
    USER_REG,
    ITEMS_LOADING,
  } from '../actions/types';
  
  const initialState = {
    checkUser:'',
    userInfo:[],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER_EXIST:
        console.log(action.payload)
        return {
            ...state,
            checkUser: action.payload,
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
  