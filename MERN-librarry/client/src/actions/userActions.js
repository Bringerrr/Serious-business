import axios from 'axios';
import { USER_SAVE_FILM, USER_AUTH, USER_REG, ITEMS_LOADING } from './types';

export const getUserData = (email,password) => dispatch => {
  axios.post(`/api/users/auth/${email}/${password}`).then(res =>
    dispatch({
      type: USER_AUTH,
      payload: res.data
    })
  );
};

export const saveFilm = (userid,body) => dispatch => {
  axios({
    method: 'patch',
    url: `/api/users/${userid}`,
    data: body
  }).then(res =>
    dispatch({
      type: USER_SAVE_FILM,
      payload: res.data
    })
  );
};



export const userReg = userInfo => dispatch => {
  axios.post('/api/users', userInfo).then(res =>
    dispatch({
      type: USER_REG,
      payload: res.data
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
