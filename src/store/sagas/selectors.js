// Select the user from the auth slice of the state
export const selectAuth = (state) => state.auth;

// Create a selector to get the user from the auth slice
export const selectUser = (state) => state.auth.user;

// Create a selector to get the loading state from the auth slice
export const selectLoading = (state) => state.auth.loading;

// Create a selector to get the error from the auth slice
export const selectError = (state) => state.auth.error;

// Create a selector to get the current name from the auth slice
export const selectCurrentName = (state) => state.auth.currentName;

// Create a selector to get the current email from the auth slice
export const selectCurrentEmail = (state) => state.auth.currentEmail;

// Create a selector to get the language from the language slice
export const selectLanguage = (state) => state.language.language;

// Create a selector to get the dog breeds
export const selectBreeds = (state) => state.dog.breeds;

// Create a selector to get the dog ids
export const selectDogIds = (state) => state.dog.dogIds;

// Create a selector to get the dogs
export const selectDogs = (state) => state.dog.dogs;

// Create a selector to get if the dogs are cached
export const selectDogsCached = (state) => state.dog.cached;

// Create a selector to get the total amount of dogs
export const selectDogCount = (state) => state.dog.total;

// Create a selector to get the next endopoint to get the next page
export const selectNextDogs = (state) => state.dog.next;

// Create a selector to get the next endopoint to get the previous page
export const selectPrevDogs = (state) => state.dog.prev;

// Create a selecter to get the dog location details
export const selectLocationDetails = (state) => state.location.locations;

// Create a selector to get the additional locations
export const selectAdditionalLocations = (state) => state.location.additionalLocations;

// Create a selector to get the cities for selected states
export const selectStateCities = (state) => state.location.stateCities;

// Create a selector for getting selected cities and selected states
export const selectStates = (state) => state.location.selectedStates;
export const selectCities = (state) => state.location.selectedCities;
export const selectCityStates = (state) => state.location.selectedCityStates;

// Create a selector to know if location search is loading
export const isLoadingNewLocation = (state) => state.location.loading;