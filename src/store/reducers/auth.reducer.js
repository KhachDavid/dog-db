// auth.reducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SET_FULL_NAME,
  SET_EMAIL,
} from "../actions/auth.actions";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
  stateReconciler: autoMergeLevel2,
};

const initialState = {
  user: null,
  loading: false,
  error: null,
  currentName: "",
  currentEmail: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user, // Store user information if needed
        loading: false,
        currentEmail: "",
        currentName: "",
      };
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        currentEmail: "",
        currentName: "",
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case SET_FULL_NAME:
      return {
        ...state,
        currentName: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        currentEmail: action.payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, authReducer);

