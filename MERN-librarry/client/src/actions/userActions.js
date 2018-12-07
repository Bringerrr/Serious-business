import axios from 'axios';
import { 
  USER_SAVE_FILM,
  USER_DEL_FILM,
  USER_AUTH,
  USER_AUTH_ERR,
  USER_REG,
  USER_SIGN_OUT, 
  USER_DASHBOARD,
  ITEMS_LOADING 
} from './types';

// sign in a user by email and password then get user's
export const getUserData = (email,password) => dispatch => {
  dispatch(userDashboard());
  axios.post(`/api/users/auth/${email}/${password}`).then(res =>
    dispatch({
      type: USER_AUTH,
      payload: res.data
    })
  ).catch (function(err) {
    dispatch ({
      type:USER_AUTH_ERR,
      payload:err
    });
  });;
};

export const saveFilm = (userid,body) => dispatch => {
  dispatch(setItemsLoading());
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

export const delFilm = (userid,body) => dispatch => {
  axios({
    method: 'patch',
    url: `/api/users/pull/${userid}`,
    data: body
  }).then(res =>
    dispatch({
      type: USER_DEL_FILM,
      payload: res.data
    })
  );
};

// add new user at db
export const userReg = userInfo => dispatch => { 
  dispatch(setItemsLoading());
  axios.post('/api/users', userInfo)
  .then(res =>
    dispatch({
      type: USER_REG,
      payload: res.data
    })
  );
};

// check login session
export const userDashboard = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/users/dashboard').then(res =>
    dispatch({
      type: USER_DASHBOARD,
      payload: res.data
    })
  );
};


// sign out
export const userSignOut = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/users/signout').then(res =>
    dispatch({
      type: USER_SIGN_OUT,
      payload: res.data
    })
  );
};


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
