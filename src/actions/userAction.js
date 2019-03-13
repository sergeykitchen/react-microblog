import { toastr } from 'react-redux-toastr';

import API from '../api';
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  SIGN_OUT
} from '../constants';
import history from '../history';

const userRequest = () => {
  return {
    type: GET_USER_DATA_REQUEST,
  };
};

const userSuccess = (user) => {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: user,
  };
};

const userError = (err) => {
  return {
    type: GET_USER_DATA_ERROR,
    payload: err
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signUpUser = data => dispatch => {
  dispatch(userRequest());
  return API.signUp(data)
    .then(res => {
      history.push('/');
      dispatch(userSuccess(res));
      toastr.success('You are logged in.')
    })
    .catch(err => {
      dispatch(userError(err.message));
      toastr.error(err.message);
    });
};

export const signInUser = data => dispatch => {
  dispatch(userRequest());
  return API.signIn(data)
    .then(res => {
      history.push('/');
      dispatch(userSuccess(res));
      toastr.success('You are logged in.')
    })
    .catch(err => {
      dispatch(userError(err.message));
      toastr.error(err.message);
    });
};
