// Dog Actions
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

export const SET_DOG_IDS = "SET_DOG_IDS";
export const DOGS_NOT_CACHED = "DOGS_NOT_CACHED";
export const MANUAL_DOG_SORT = "MANUAL_DOG_SORT"

// Action Creators
export const fetchBreedsRequest = () => ({ type: FETCH_BREEDS_REQUEST });
export const fetchBreedsSuccess = (breeds) => ({ type: FETCH_BREEDS_SUCCESS, breeds });
export const fetchBreedsFailure = (error) => ({ type: FETCH_BREEDS_FAILURE, error });

export const searchDogsRequest = (queryParams) => ({ type: SEARCH_DOGS_REQUEST, queryParams });
export const searchDogsSuccess = (dogs, cached) => ({ type: SEARCH_DOGS_SUCCESS, dogs, cached });
export const searchDogsFailure = (error) => ({ type: SEARCH_DOGS_FAILURE, error });

export const fetchDogsRequest = (dogIdList) => ({ type: FETCH_DOGS_REQUEST, dogIdList });
export const fetchDogsSuccess = (dogs) => ({ type: FETCH_DOGS_SUCCESS, dogs });
export const fetchDogsFailure = (error) => ({ type: FETCH_DOGS_FAILURE, error });

export const matchDogsRequest = (dogIdList) => ({ type: MATCH_DOGS_REQUEST, dogIdList });
export const matchDogsSuccess = (dogs) => ({ type: MATCH_DOGS_SUCCESS, dogs });
export const matchDogsFailure = (error) => ({ type: MATCH_DOGS_FAILURE, error });

export const setDogIds = (dogIdList, next, prev) => ({ type: SET_DOG_IDS, dogIdList, next, prev});
export const dogsNotCached = () => ({ type: DOGS_NOT_CACHED });

export const manualDogSort = (sortBy) => ({ type: MANUAL_DOG_SORT, sortBy });