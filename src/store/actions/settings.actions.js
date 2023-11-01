export const ADD_SAVED_SEARCH = "ADD_SAVED_SEARCH";
export const ADD_SAVED_SEARCH_SUCCESS = "ADD_SAVED_SEARCH_SUCCESS";
export const REMOVE_SAVED_SEARCH = "REMOVE_SAVED_SEARCH";
export const DONT_SHOW_CONFIRMATION = "DONT_SHOW_CONFIRMATION"
export const ACTIVATE_SNACKBAR = "ACTIVATE_SNACKBAR"
export const DEACTIVATE_SNACKBAR = "DEACTIVATE_SNACKBAR"

export const addSavedSearch = (breeds, cities, states, cityStates, additionalLocations, tagStack) => ({
  type: ADD_SAVED_SEARCH,
  payload: {
    breeds,
    cities,
    states,
    cityStates,
    additionalLocations,
    tagStack,
  }
});

export const addSavedSearchSuccess = (data) => ({
  type: ADD_SAVED_SEARCH_SUCCESS,
  payload: {
    data
  }
});


export const removeSavedSearch = (id) => ({
  type: REMOVE_SAVED_SEARCH,
  payload: id
});

export const dontShowConfirmation = () => ({
  type: DONT_SHOW_CONFIRMATION,
})

export const activateSnackbar = (message, snackbarHorizontal = "right", snackbarVertical = "bottom") => ({
  type: ACTIVATE_SNACKBAR,
  snackbarMessage: message,
  snackbarHorizontal: snackbarHorizontal,
  snackbarVertical: snackbarVertical,
})

export const deactivateSnackbar = () => ({
  type: DEACTIVATE_SNACKBAR
})
