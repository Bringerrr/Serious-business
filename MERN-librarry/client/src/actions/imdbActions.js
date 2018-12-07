import axios from 'axios';
import { GET_FILM, FILMS_LOADING, GET_CURRENT_FILM } from './types';

export const getFilm = (title, year, type) => dispatch => {
  dispatch(setFilmsLoading());
  axios.get(`http://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&apikey=4fd43156`)
  .then(res =>
    dispatch({
      type: GET_FILM,
      payload: res.data
    })
  );
};

export const getCurrentFilm = id => dispatch => {
  dispatch(setFilmsLoading());
  axios.get(`http://www.omdbapi.com/?i=${id}&&apikey=4fd43156`)
  .then(res =>
    dispatch({
      type: GET_CURRENT_FILM,
      payload: res.data
    })
  );
};

export const setFilmsLoading = () => {
    return {
      type: FILMS_LOADING
    };
  };
  