// Dog Actions
export const SET_SELECTED_BREEDS = 'SET_SELECTED_BREEDS';

export const FETCH_BREEDS_REQUEST = 'FETCH_BREEDS_REQUEST';
export const FETCH_BREEDS_SUCCESS = 'FETCH_BREEDS_SUCCESS';
export const FETCH_BREEDS_FAILURE = 'FETCH_BREEDS_FAILURE';

export const SEARCH_DOGS_REQUEST = 'SEARCH_DOGS_REQUEST';
export const SEARCH_DOGS_SUCCESS = 'SEARCH_DOGS_SUCCESS';
export const SEARCH_DOGS_FAILURE = 'SEARCH_DOGS_FAILURE';

export const FETCH_DOGS_REQUEST = 'FETCH_DOGS_REQUEST';
export const FETCH_DOGS_SUCCESS = 'FETCH_DOGS_SUCCESS';
export const FETCH_DOGS_FAILURE = 'FETCH_DOGS_FAILURE';

export const MATCH_DOGS_REQUEST = 'MATCH_DOG_REQUEST';
export const MATCH_DOGS_SUCCESS = 'MATCH_DOG_SUCCESS';
export const MATCH_DOGS_FAILURE = 'MATCH_DOG_FAILURE';

export const ADD_FAVORITES_REQUEST = 'ADD_FAVORITES_REQUEST';
export const ADD_FAVORITES_SUCCESS = 'ADD_FAVORITES_SUCCESS';
export const ADD_FAVORITES_FAILURE = 'ADD_FAVORITES_FAILURE';

export const REMOVE_FAVORITES_REQUEST = 'REMOVE_FAVORITES_REQUEST';
export const REMOVE_FAVORITES_SUCCESS = 'REMOVE_FAVORITES_SUCCESS';
export const REMOVE_FAVORITES_FAILURE = 'REMOVE_FAVORITES_FAILURE';

export const SET_DOG_IDS = "SET_DOG_IDS";
export const DOGS_NOT_CACHED = "DOGS_NOT_CACHED";
export const MANUAL_DOG_SORT = "MANUAL_DOG_SORT"

// Action Creators
export const setSelectedBreeds = (breeds) => ({ type: SET_SELECTED_BREEDS, payload: breeds});

export const fetchBreedsRequest = () => ({ type: FETCH_BREEDS_REQUEST });
export const fetchBreedsSuccess = (breeds) => ({ type: FETCH_BREEDS_SUCCESS, breeds });
export const fetchBreedsFailure = (error) => ({ type: FETCH_BREEDS_FAILURE, error });

export const addFavoritesRequest = (id) => ({ type: ADD_FAVORITES_REQUEST, payload: id });
export const addFavoritesSuccess = (id) => ({ type: ADD_FAVORITES_SUCCESS, payload: id });
export const addFavoritesFailure = (error) => ({ type: ADD_FAVORITES_FAILURE, payload: error});

export const removeFavoritesRequest = () => ({ type: REMOVE_FAVORITES_REQUEST });
export const removeFavoritesSuccess = (id) => ({ type: REMOVE_FAVORITES_SUCCESS, payload: id });
export const removeFavoritesFailure = () => ({ type: REMOVE_FAVORITES_FAILURE});

export const searchDogsRequest = (queryParams) => ({ type: SEARCH_DOGS_REQUEST, queryParams });
export const searchDogsSuccess = (dogs, cached) => ({ type: SEARCH_DOGS_SUCCESS, dogs, cached });
export const searchDogsFailure = (error) => ({ type: SEARCH_DOGS_FAILURE, error });

export const fetchDogsRequest = (dogID) => ({ type: FETCH_DOGS_REQUEST, payload: dogID });
export const fetchDogsSuccess = (dogs) => ({ type: FETCH_DOGS_SUCCESS, dogs });
export const fetchDogsFailure = (error) => ({ type: FETCH_DOGS_FAILURE, error });

export const matchDogsRequest = () => ({ type: MATCH_DOGS_REQUEST });
export const matchDogsSuccess = (id) => ({ type: MATCH_DOGS_SUCCESS, payload: id });
export const matchDogsFailure = (error) => ({ type: MATCH_DOGS_FAILURE, error });

export const setDogIds = (dogIdList, next, prev) => ({ type: SET_DOG_IDS, dogIdList, next, prev});
export const dogsNotCached = () => ({ type: DOGS_NOT_CACHED });

export const manualDogSort = (sortBy) => ({ type: MANUAL_DOG_SORT, sortBy });