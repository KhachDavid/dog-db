// Action Types
export const FETCH_LOCATIONS_REQUEST = "FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

export const SEARCH_LOCATIONS_REQUEST = "SEARCH_LOCATIONS_REQUEST";
export const SEARCH_LOCATIONS_SUCCESS = "SEARCH_LOCATIONS_SUCCESS";
export const SEARCH_LOCATIONS_FAILURE = "SEARCH_LOCATIONS_FAILURE";

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

export const searchLocationsRequest = () => ({
  type: SEARCH_LOCATIONS_REQUEST,
});

export const searchLocationsSuccess = (locations) => ({
  type: SEARCH_LOCATIONS_SUCCESS,
  payload: locations,
});

export const searchLocationsFailure = (error) => ({
  type: SEARCH_LOCATIONS_FAILURE,
  payload: error,
});
