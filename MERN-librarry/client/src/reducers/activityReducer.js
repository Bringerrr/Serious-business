import {
    POST_REVIEW,
    GET_REVIEW,
  } from '../actions/types';
  
  const initialState = {
    reviews: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW:
        return {
            ...state,
            reviews: action.payload,
            loading: false
        };
        case POST_REVIEW:
        return {
            ...state,
            loading: false
        };
      default:
        return state;
    }
  }
  