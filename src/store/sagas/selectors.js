import { createSelector } from 'reselect';

// Select the user from the auth slice of the state
const selectAuth = (state) => state.auth;

// Create a selector to get the user from the auth slice
export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);
