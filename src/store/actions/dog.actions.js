// Dog Actions
export const FETCH_BREEDS_REQUEST = 'FETCH_BREEDS_REQUEST';
export const FETCH_BREEDS_SUCCESS = 'FETCH_BREEDS_SUCCESS';
export const FETCH_BREEDS_FAILURE = 'FETCH_BREEDS_FAILURE';

export const SEARCH_DOGS_REQUEST = 'SEARCH_DOGS_REQUEST';
export const SEARCH_DOGS_SUCCESS = 'SEARCH_DOGS_SUCCESS';
export const SEARCH_DOGS_FAILURE = 'SEARCH_DOGS_FAILURE';

export const FETCH_DOGS_BY_IDS_REQUEST = 'FETCH_DOGS_BY_IDS_REQUEST';
export const FETCH_DOGS_BY_IDS_SUCCESS = 'FETCH_DOGS_BY_IDS_SUCCESS';
export const FETCH_DOGS_BY_IDS_FAILURE = 'FETCH_DOGS_BY_IDS_FAILURE';

export const MATCH_DOG_REQUEST = 'MATCH_DOG_REQUEST';
export const MATCH_DOG_SUCCESS = 'MATCH_DOG_SUCCESS';
export const MATCH_DOG_FAILURE = 'MATCH_DOG_FAILURE';

// Action Creators
export const fetchBreedsRequest = () => ({ type: FETCH_BREEDS_REQUEST });
export const fetchBreedsSuccess = (breeds) => ({ type: FETCH_BREEDS_SUCCESS, breeds });
export const fetchBreedsFailure = (error) => ({ type: FETCH_BREEDS_FAILURE, error });
