import {LoginConst} from '../types';
import Axios from 'axios';

const setUser = user => {
  return {
    type: LoginConst.LOGIN_SUCESSFUL,
    payload: {user},
  };
};

const setError = () => {
  return {
    type: LoginConst.LOGIN_ERROR,
  };
};

export const loginRequest = (user, password) => async dispatch => {
  Axios.post('https://thequeuer.herokuapp.com/login', {
    login: user,
    password: password,
  })
    .then(response => {
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(setError());
      }
    })
    .catch(() => console.log('passou no catch'));
};
