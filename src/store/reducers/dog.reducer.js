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
  SET_DOG_IDS,
  DOGS_NOT_CACHED,
  MANUAL_DOG_SORT,
} from "../actions/dog.actions";

const initialState = {
  dogs: [],
  dogIds: [],
  breeds: [],
  total: "",
  next: "",
  prev: "",
  loading: false,
  error: null,
  cached: false,
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
      return {
        ...state,
        dogIds: action.dogs.resultIds,
        total: action.dogs.total,
        next: action.dogs.next,
        prev: action.dogs.prev,
        cached: action.cached,
        loading: false,
        error: null,
      };

    case SEARCH_DOGS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_DOGS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_DOGS_SUCCESS:
      return { ...state, dogs: action.dogs, loading: false, error: null };

    case FETCH_DOGS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case SET_DOG_IDS:
      return {
        ...state,
        dogIds: action.dogIdList,
        next: action.next,
        prev: action.prev,
      };

    case DOGS_NOT_CACHED:
      return { ...state, cached: false };

    case MANUAL_DOG_SORT:
      switch (action.sortBy) {
        case "name:asc":
          const newDogsNameAsc = state.dogs.sort((a, b) => a.name.localeCompare(b.name));
          return {
            ...state,
            dogs: newDogsNameAsc,
          };
        case "age:asc":
          const newDogsAgeAsc = state.dogs.sort((a, b) => a.age - b.age);
          return {
            ...state,
            dogs: newDogsAgeAsc
          };
        case "age:desc":
          const newDogsAgeDesc = state.dogs.sort((a, b) => b.age - a.age);
          return {
            ...state,
            dogs: newDogsAgeDesc
          };
        case "breed:asc":
          const newDogsBreedAsc = state.dogs.sort((a, b) => a.breed.localeCompare(b.breed));
          return {
            ...state,
            dogs: newDogsBreedAsc
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

export default dogReducer;
