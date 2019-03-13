import { toastr } from 'react-redux-toastr';

import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
} from '../constants';
import API from '../api';

/* get categories actions */

const getCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST,
});

const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

const getCategoriesError = (payload) => ({
  type: GET_CATEGORIES_ERROR,
  payload,
});

export const getCategories = (data) => dispatch => {
  dispatch(getCategoriesRequest());
  API.getCategories(data)
    .then((res) => {
      dispatch(getCategoriesSuccess(res));
    })
    .catch(err => {
      dispatch(getCategoriesError(err.message));
    });
};

/* create category actions */

const createCategoryRequest = data => ({
  type: CREATE_CATEGORY_REQUEST,
});

const createCategorySuccess = res => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: res,
});

const createCategoryError = err => ({
  type: CREATE_CATEGORY_ERROR,
  payload: err,
});

export const createCategory = data => dispatch => {
  dispatch(createCategoryRequest());
  return API.createCategory(data)
    .then(() => {
      dispatch(createCategorySuccess(data));
    })
    .catch(err => {
      dispatch(createCategoryError(err.message));
      toastr.error(err.message);
    });
};