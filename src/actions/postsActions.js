import { toastr } from 'react-redux-toastr';

import API from '../api';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  GET_POSTS_DATA_REQUEST,
  GET_POSTS_DATA_SUCCESS,
  GET_POSTS_DATA_ERROR,
  SET_FILTER,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
} from '../constants';
import history from '../history';
import { createCategory } from './categoryActions';

/* filter actions */

export const setFilter = id => ({
  type: SET_FILTER,
  payload: id,
});

/* create post actions */
const getCreateRequest = () => ({
  type: CREATE_POST_REQUEST,
});

const createPostSuccess = (data) => ({
  type: CREATE_POST_SUCCESS,
  payload: data,
});

const createPostError = (payload) => ({
  type: CREATE_POST_ERROR,
  payload,
});

export const createPost = (data, isNewCategory) => dispatch => {
  dispatch(getCreateRequest());
  if (isNewCategory) {
    dispatch(createCategory(data.category))
      .then(() => {
        API.createPost(data)
          .then((res) => {
            dispatch(createPostSuccess(res));
            history.push('/');
            toastr.success('Post has been created.');
          })
          .catch(err => {
            dispatch(createPostError(err.message));
            toastr.error(err.message);
          });
      })
  } else {
    API.createPost(data)
      .then((res) => {
        dispatch(createPostSuccess(res));
        history.push('/');
        toastr.success('Post has been created.');
      })
      .catch(err => {
        dispatch(createPostError(err.message));
        toastr.error(err.message);
      });
  }
};


/* get posts actions*/
const getPostsRequest = () => ({
  type: GET_POSTS_DATA_REQUEST,
});

const getPostsSuccess = (res) => ({
  type: GET_POSTS_DATA_SUCCESS,
  payload: res
});

const getPostsError = (payload) => ({
  type: GET_POSTS_DATA_ERROR,
  payload,
});

export const getPosts = () => dispatch => {
  dispatch(getPostsRequest());
  API.getPosts()
    .then((res) => {
      dispatch(getPostsSuccess(res));
    })
    .catch((err) => {
      dispatch(getPostsError(err.message));
    })
}

/* update post actions  */

const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST,
});

const updatePostSuccess = (res) => ({
  type: UPDATE_POST_SUCCESS,
  payload: res,
});

const updatePostError = err => ({
  type: UPDATE_POST_ERROR,
  payload: err,
});


export const updatePost = (data, isNewCategory) => dispatch => {
  dispatch(updatePostRequest());
  if (isNewCategory) {
    dispatch(createCategory(data.category))
      .then(() => {
        API.updatePost(data)
          .then((res) => {
            dispatch(updatePostSuccess(res));
            history.push('/');
            toastr.success('Post has been updated.');
          })
          .catch(err => {
            dispatch(updatePostError(err.message));
            toastr.error(err.message);
          });
      })
    
  } else {
    return API.updatePost(data)
      .then((res) => {
        dispatch(updatePostSuccess(res));
        history.push('/');
        toastr.success('Post has been updated.');
      })
      .catch((err) => {
        dispatch(updatePostError(err));
        toastr.error(err.message);
      });
  }
};