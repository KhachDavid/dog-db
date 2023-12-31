// Action Types
export const FETCH_LOCATIONS_REQUEST = "FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

export const SEARCH_LOCATIONS_REQUEST = "SEARCH_LOCATIONS_REQUEST";
export const SEARCH_LOCATIONS_SUCCESS = "SEARCH_LOCATIONS_SUCCESS";
export const SEARCH_LOCATIONS_FAILURE = "SEARCH_LOCATIONS_FAILURE";

export const REMOVE_CITY_ZIP_CODES = "REMOVE_CITY_ZIP_CODES";
export const REMOVE_STATE_ZIP_CODES = "REMOVE_STATE_ZIP_CODES";
export const RESET_ADDITIONAL_LOCATIONS = "RESET_ADDITIONAL_LOCATIONS";

export const GET_AUTOCOMPLETE_CITIES_REQUEST =
  "GET_AUTOCOMPLETE_CITIES_REQUEST";
export const GET_AUTOCOMPLETE_CITIES_SUCCESS =
  "GET_AUTOCOMPLETE_CITIES_SUCCESS";
export const GET_AUTOCOMPLETE_CITIES_FAILURE =
  "GET_AUTOCOMPLETE_CITIES_FAILURE";

export const REMOVE_AUTOCOMPLETE_CITIES_REQUEST =
  "REMOVE_AUTOCOMPLETE_CITIES_REQUEST";
export const REMOVE_AUTOCOMPLETE_CITIES_SUCCESS =
  "REMOVE_AUTOCOMPLETE_CITIES_SUCCESS";
export const REMOVE_AUTOCOMPLETE_CITIES_FAILURE =
  "REMOVE_AUTOCOMPLETE_CITIES_FAILURE";

export const ADD_CITY = "ADD_CITY";
export const REMOVE_CITY = "REMOVE_CITY";

export const ADD_STATE = "ADD_STATE";
export const REMOVE_STATE = "REMOVE_STATE";
export const RESET_ALL_LOCATIONS = "RESET_ALL_LOCATIONS";
export const CACHE_STATE_LOCATIONS = "CACHE_STATE_LOCATIONS";

export const SET_LOCATIONS = "SET_LOCATIONS";
export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const SET_GEOBOUNDING_BOX = "SET_GEOBOUNDING_BOX";

// Action Creators
export const fetchLocationsRequest = (zipCodes) => ({
  type: FETCH_LOCATIONS_REQUEST,
  payload: zipCodes,
});

export const fetchLocationsSuccess = (locations) => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: locations,
});

export const fetchLocationsFailure = (error) => ({
  type: FETCH_LOCATIONS_FAILURE,
  payload: error,
});

export const searchLocationsRequest = (queryParams) => ({
  type: SEARCH_LOCATIONS_REQUEST,
  payload: queryParams,
});

export const searchLocationsSuccess = (locations) => ({
  type: SEARCH_LOCATIONS_SUCCESS,
  payload: locations,
});

export const searchLocationsFailure = (error) => ({
  type: SEARCH_LOCATIONS_FAILURE,
  payload: error,
});

export const removeCityZipCodes = (city) => ({
  type: REMOVE_CITY_ZIP_CODES,
  payload: city,
});

export const removeStateZipCodes = (state) => ({
  type: REMOVE_STATE_ZIP_CODES,
  payload: state,
});

export const resetAdditionalLocations = (newLocations) => ({
  type: RESET_ADDITIONAL_LOCATIONS,
  payload: newLocations,
});

export const getAutocompleteCities = (queryParams) => ({
  type: GET_AUTOCOMPLETE_CITIES_REQUEST,
  payload: queryParams,
});

export const getAutocompleteCitiesSuccess = (locations) => ({
  type: GET_AUTOCOMPLETE_CITIES_SUCCESS,
  payload: locations,
});

export const getAutocompleteCitiesFailure = (error) => ({
  type: GET_AUTOCOMPLETE_CITIES_FAILURE,
  payload: error,
});

export const removeAutocompleteCities = (state) => ({
  type: REMOVE_AUTOCOMPLETE_CITIES_REQUEST,
  payload: state,
});

export const removeAutocompleteCitiesSuccess = (locations) => ({
  type: REMOVE_AUTOCOMPLETE_CITIES_SUCCESS,
  payload: locations,
});

export const removeAutocompleteCitiesFailure = (error) => ({
  type: REMOVE_AUTOCOMPLETE_CITIES_FAILURE,
  payload: error,
});

export const addState = (state) => ({
  type: ADD_STATE,
  payload: state,
});

export const removeState = (state) => ({
  type: REMOVE_STATE,
  payload: state,
});

export const addCity = (city, state) => ({
  type: ADD_CITY,
  payload: {
    city: city,
    state: state,
  },
});

export const removecity = (city) => ({
  type: REMOVE_CITY,
  payload: city,
});

export const resetAllLocations = () => ({
  type: RESET_ALL_LOCATIONS,
});

export const cachedStateLocations = (state, locations) => ({
  type: CACHE_STATE_LOCATIONS,
  payload: {
    state: state,
    locations: locations,
  },
});

export const setLocations = (
  cities,
  states,
  cityStates,
  additionalLocations
) => ({
  type: SET_LOCATIONS,
  payload: {
    cities,
    states,
    cityStates,
    additionalLocations,
  },
});

export const setUserLocation = (lat, lng) => ({
  type: SET_USER_LOCATION,
  payload: {
    lat,
    lng,
  },
});

export const setGeoboundingBox = (geoBoundingBox) => ({
  type: SET_GEOBOUNDING_BOX,
  payload: geoBoundingBox
})
