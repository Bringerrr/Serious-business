import axios from 'axios';
import { 
  POST_REVIEW,
  GET_REVIEW,
  REVIEWS_LOADING
} from './types';

export const postReview = body => dispatch => {
    dispatch(setReviewLoading());
    axios({
      method: 'post',
      url: `/api/reviews`,
      data: body
    }).then(res =>
      dispatch({
        type: POST_REVIEW,
        payload: res.data
      })
    );
  };

// get all users' review
export const getReview = (user,post) => dispatch => {
    axios.get(`/api/reviews`).then(res =>
      dispatch({
        type: GET_REVIEW,
        payload: res.data
      })
    );
};

export const setReviewLoading = () => {
    return {
      type: REVIEWS_LOADING
    };
  };
  
