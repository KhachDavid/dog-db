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

