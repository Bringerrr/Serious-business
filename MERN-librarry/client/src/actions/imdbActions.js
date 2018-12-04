import axios from 'axios';
import { GET_FILM, ITEMS_LOADING, GET_CURRENT_FILM } from './types';

export const getFilm = (title, year, type, page) => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`http://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&page=${page}&apikey=4fd43156`)
  .then(res =>
    dispatch({
      type: GET_FILM,
      payload: res.data
    })
  );
};

export const getCurrentFilm = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`http://www.omdbapi.com/?i=${id}&&apikey=4fd43156`)
  .then(res =>
    dispatch({
      type: GET_CURRENT_FILM,
      payload: res.data
    })
  );
};

export const setItemsLoading = () => {
    return {
      type: ITEMS_LOADING
    };
  };
  