import {
  FETCH_BREEDS_REQUEST,
  FETCH_BREEDS_SUCCESS,
  FETCH_BREEDS_FAILURE,
  SEARCH_DOGS_REQUEST,
  SEARCH_DOGS_SUCCESS,
  SEARCH_DOGS_FAILURE,
  FETCH_DOGS_REQUEST,
  FETCH_DOGS_SUCCESS,
  FETCH_DOGS_FAILURE,
} from "../actions/dog.actions";

const initialState = {
  dogs: [],
  dogIds: [],
  breeds: [],
  loading: false,
  error: null,
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BREEDS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_BREEDS_SUCCESS:
      return { ...state, breeds: action.breeds, loading: false };

    case FETCH_BREEDS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case SEARCH_DOGS_REQUEST:
      return { ...state, loading: true, error: null };

    case SEARCH_DOGS_SUCCESS:
      return { ...state, dogIds: action.dogs.resultIds, loading: false, error: null };

    case SEARCH_DOGS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_DOGS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_DOGS_SUCCESS: 
      return { ...state, dogs: action.dogs, loading: false, error: null };

    case FETCH_DOGS_FAILURE: 
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default dogReducer;
