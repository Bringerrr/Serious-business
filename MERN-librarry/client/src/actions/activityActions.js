import axios from 'axios';
import { 
  POST_REVIEW,
  GET_REVIEW,
} from './types';

// post users' review
// export const postReview = body => dispatch => {
//   axios.post(`/api/activities`).then(res =>
//     dispatch({
//       type: POST_REVIEW,
//       payload: res.data
//     })
//   );
// };

export const postReview = body => dispatch => {
    axios({
      method: 'post',
      url: `/api/activities`,
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
    axios.get(`/api/activities`).then(res =>
      dispatch({
        type: GET_REVIEW,
        payload: res.data
      })
    );
};
  
