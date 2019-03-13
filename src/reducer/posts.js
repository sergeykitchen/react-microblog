import * as R from 'ramda';

import {
  GET_POSTS_DATA_REQUEST,
  GET_POSTS_DATA_SUCCESS,
  GET_POSTS_DATA_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  SET_FILTER,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
} from '../constants';

const initisalState = {
  filter: null,
  posts: null,
  loading: false,
  error: null,
  newPost: {
    loading: false,
    error: null,
    success: false,
  },
};

export default (state = initisalState, { type, payload }) => {
  switch (type) {
    case UPDATE_POST_REQUEST: {
      const currentPost = { loading: true, error: null, success: false };
      return {
        ...state,
        newPost: currentPost,
      };
    }
    case UPDATE_POST_SUCCESS: {
      const currentPost = { loading: false, error: null, success: true, };
      const newPosts = R.map(item => {
        return item.id === payload.id
          ? payload
          : item;
      }, state.posts);
      
      return {
        ...state,
        posts: newPosts,
        newPost: currentPost,
      };
    }
    case UPDATE_POST_ERROR: {
      const currentPost = { loading: false, error: payload, success: false, };
      return {
        ...state,
        newPost: currentPost,
      };
    }
    case SET_FILTER:
      return {
        ...state,
        filter: payload,
      };
    case GET_POSTS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: R.reverse(R.values(payload)),
      };
    case GET_POSTS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CREATE_POST_REQUEST: {
      const currentPost = { loading: true, error: null, success: false };
      return {
        ...state,
        newPost: currentPost,
      };
    }
    case CREATE_POST_SUCCESS: {
      const currentPost = { loading: false, error: null, success: true };
      return {
        ...state,
        newPost: currentPost,
        posts: R.prepend(payload, state.posts),
      };
    }
    case CREATE_POST_ERROR: {
      const currentPost = { loading: false, error: payload, success: false };
      return {
        ...state,
        newPost: currentPost,
      };
    }
    default:
      return state;
  };
};