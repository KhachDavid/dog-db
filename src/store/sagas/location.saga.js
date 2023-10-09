import { put, call, takeLatest, select } from "redux-saga/effects";

import {
  SEARCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_REQUEST,
  fetchLocationsSuccess,
  fetchLocationsFailure,
} from "../actions/location.actions";

import { logoutSuccess } from "../actions/auth.actions";

import * as api from "../../api/location.api";

function* searchLocationsSaga(action) {
  try {
    const response = yield call(api.searchLocations, action.payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function* fetchLocationsSaga(action) {
  try {
    const response = yield call(api.fetchLocations, action.payload);
    const { status } = response;
    if (status === 401) {
      // if no longer authorized, log the user out
      yield put(logoutSuccess());
    }
    if (status === 200) {
      yield put(fetchLocationsSuccess(response.data));
    } else {
      yield put(fetchLocationsFailure(response));
    }
  } catch (error) {
    console.log(error);
    const { status } = error.response;
    if (status === 401) {
      // if no longer authorized, log the user out
      yield put(logoutSuccess());
    }
  }
}

export default function* () {
  yield takeLatest(SEARCH_LOCATIONS_REQUEST, searchLocationsSaga);
  yield takeLatest(FETCH_LOCATIONS_REQUEST, fetchLocationsSaga);
}
