import {
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_ERROR,
    SIGN_OUT,
  } from '../constants';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case SIGN_OUT: 
            return {
                ...state,
                loading: false,
                error: null,
                user: null,
            }
        case GET_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                user: null,
            };
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: payload,
            };
        case GET_USER_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                user: null,
            }
        default: return state;
    };
};
