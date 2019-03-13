import * as R from 'ramda';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR
} from '../constants';

const initialState = {
  error: null,
  loading: false,
  success: false,
  categories: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: R.values(payload),
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_CATEGORY_SUCCESS:
      const newCategories = R.append(payload, state.categories);
      return {
        ...state,
        categories: newCategories,
        loading: false
      };
    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default: return state;
  };
};
