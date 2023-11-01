import {
  SET_SELECTED_BREEDS,

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

  ADD_FAVORITES_REQUEST,
  ADD_FAVORITES_SUCCESS,
  ADD_FAVORITES_FAILURE,

  REMOVE_FAVORITES_REQUEST,
  REMOVE_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_FAILURE,

  MATCH_DOGS_REQUEST,
  MATCH_DOGS_SUCCESS,
  MATCH_DOGS_FAILURE,
} from "../actions/dog.actions";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: "dog",
  storage,
  whitelist: ["favorites"],
  stateReconciler: autoMergeLevel2,
};

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
  favorites: [],
  addingFavorites: false,
  removingFavorites: false,
  selectedBreeds: [],
  matchedDogID: [],
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_BREEDS:
      return { ...state, selectedBreeds: action.payload}

    case ADD_FAVORITES_REQUEST:
      return { ...state, addingFavorites: true }
    
    case ADD_FAVORITES_SUCCESS:
      return { ...state, addingFavorites: false, favorites: [action.payload, ...state.favorites]}

    case ADD_FAVORITES_FAILURE:
      return { ...state, addingFavorites: false }

    case REMOVE_FAVORITES_REQUEST:
      return { ...state, removingFavorites: true }

    case REMOVE_FAVORITES_SUCCESS:
      const updatedFavorites = state.favorites.filter(item => item !== action.payload);
      return { ...state, removingFavorites: false, favorites: updatedFavorites}

    case REMOVE_FAVORITES_FAILURE:
      return { ...state, removingFavorites: false }

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

    case MATCH_DOGS_REQUEST:
      return { ...state, loading: true };
    
    case MATCH_DOGS_SUCCESS:
      return { ...state, matchedDogID: [action.payload] };
    
    case MATCH_DOGS_FAILURE:
      return { ...state, error: action.payload };

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

export default persistReducer(persistConfig, dogReducer);
