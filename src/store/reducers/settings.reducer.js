import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  ADD_SAVED_SEARCH_SUCCESS,
  REMOVE_SAVED_SEARCH,
  DONT_SHOW_CONFIRMATION,
  ACTIVATE_SNACKBAR,
  DEACTIVATE_SNACKBAR,
} from "../actions/settings.actions";

const persistConfig = {
  key: "settings",
  storage,
  whitelist: ["savedSearches"],
  stateReconciler: autoMergeLevel2,
};

const initialState = {
  savedSearches: {}, // Object to store saved searches
  confirmAutomaticSearchRemoval: true, // if set to false, will automatically remove the earliest saved search
  isSnackbarActive: false,
  snackbarMessage: "",
  snackbarVertical: 'bottom',
  snackbarHorizontal: 'right',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SAVED_SEARCH_SUCCESS:
      // Generate a unique ID for the new saved search
      const newId = Date.now();
      const { breeds, cities, states, cityStates, additionalLocations, tagStack } = action.payload.data;

      return {
        ...state,
        savedSearches: {
            [newId]: { id: newId, breeds, cities, states, cityStates, additionalLocations, tagStack },
            ...state.savedSearches,
        },
      };
    case REMOVE_SAVED_SEARCH:
      const idToRemove = action.payload;
      // Create a copy of the savedSearches object without the search to be removed
      const updatedSavedSearches = { ...state.savedSearches };
      delete updatedSavedSearches[idToRemove];

      return {
        ...state,
        savedSearches: updatedSavedSearches,
      };
    case DONT_SHOW_CONFIRMATION:
      return {
        ...state,
        confirmAutomaticSearchRemoval: false,
      };
    case ACTIVATE_SNACKBAR:
      return {
        ...state,
        isSnackbarActive: true,
        snackbarMessage: action.snackbarMessage,
        snackbarHorizontal: action.snackbarHorizontal, 
        snackbarVertical: action.snackbarVertical,
      }
    case DEACTIVATE_SNACKBAR:
      return {
        ...state,
        isSnackbarActive: false,
        snackbarMessage: ""
      }
    default:
      return state;
  }
};

export default persistReducer(persistConfig, settingsReducer);
