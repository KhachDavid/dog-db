// reducer.js

import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  SEARCH_LOCATIONS_REQUEST,
  SEARCH_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS_FAILURE,
} from "../actions/location.actions";

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
      };
    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
      };
    case SEARCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default locationsReducer;
