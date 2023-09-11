import {
    FETCH_BREEDS_REQUEST,
    FETCH_BREEDS_SUCCESS,
    FETCH_BREEDS_FAILURE,
    // ...other action types
  } from '../actions/dog.actions';
  
  const initialState = {
    breeds: [],
    loading: false,
    error: null,
    // ...other initial state properties
  };
  
  const dogReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BREEDS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_BREEDS_SUCCESS:
        return { ...state, breeds: action.breeds, loading: false };
  
      case FETCH_BREEDS_FAILURE:
        return { ...state, loading: false, error: action.error };
  
      // Handle other action types here...
  
      default:
        return state;
    }
  };
  
  export default dogReducer;
  