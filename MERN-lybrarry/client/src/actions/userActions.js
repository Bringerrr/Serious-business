import axios from 'axios';
import { GET_USER_EXIST, USER_REG, ITEMS_LOADING } from './types';

export const checkUserExistence = email => dispatch => {

  axios.post(`/api/users/auth/${email}`).then(res =>
    dispatch({
      type: GET_USER_EXIST,
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
