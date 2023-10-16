// reducer.js

import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  SEARCH_LOCATIONS_REQUEST,
  SEARCH_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS_FAILURE,
  RESET_ADDITIONAL_LOCATIONS,
  GET_AUTOCOMPLETE_CITIES_SUCCESS,
  REMOVE_AUTOCOMPLETE_CITIES_SUCCESS,
} from "../actions/location.actions";

const initialState = {
  locations: [],
  loading: false,
  error: null,
  additionalLocations: [],
  stateCities: [],
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
        additionalLocations: action.payload,
      };
    case SEARCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_ADDITIONAL_LOCATIONS:
      return {
        ...state,
        additionalLocations: action.payload,
      };
    case GET_AUTOCOMPLETE_CITIES_SUCCESS:
      return {
        ...state,
        stateCities: action.payload,
      };
    case REMOVE_AUTOCOMPLETE_CITIES_SUCCESS:
      return {
        ...state,
        stateCities: action.payload,
      };
    default:
      return state;
  }
};

export default locationsReducer;
