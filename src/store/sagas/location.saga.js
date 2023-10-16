import { put, call, takeLatest, select } from "redux-saga/effects";
import { selectAdditionalLocations, selectStateCities } from "./selectors";
import {
  SEARCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_REQUEST,
  REMOVE_CITY_ZIP_CODES,
  REMOVE_STATE_ZIP_CODES,
  fetchLocationsSuccess,
  fetchLocationsFailure,
  searchLocationsSuccess,
  resetAdditionalLocations,
  GET_AUTOCOMPLETE_CITIES_REQUEST,
  REMOVE_AUTOCOMPLETE_CITIES_REQUEST,
  getAutocompleteCitiesSuccess,
  removeAutocompleteCitiesSuccess,
} from "../actions/location.actions";

import { logoutSuccess } from "../actions/auth.actions";

import * as api from "../../api/location.api";
import { cityAutocompleteLimit } from "../../constants/location.constants";
import { dogsNotCached } from "../actions/dog.actions";

function* searchLocationsSaga(action) {
  try {
    const response = yield call(api.searchLocations, action.payload);
    const additionalLocations = yield select(selectAdditionalLocations);
    const newData = response.data.results;
    let filteredResults = additionalLocations;
    if (action.payload.states && action.payload.city) {
      let state = action.payload.states[0];
      filteredResults = additionalLocations.filter(
        (res) => res.state !== state
      );
    }

    yield put(searchLocationsSuccess([...newData, ...filteredResults]));
    yield put(dogsNotCached());
  } catch (error) {
    console.log(error);
  }
}

/**
 * Called by CardView to get the city name of the dog zip code
 * @param {} action 
 */
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

function* removeCityZipCodesSaga(action) {
  const cityName = action.payload;
  const additionalLocations = yield select(selectAdditionalLocations);

  // Define a function to filter the location objects
  const filteredAdditionalLocations = additionalLocations.filter(
    (location) => location.city !== cityName
  );

  yield put(resetAdditionalLocations(filteredAdditionalLocations));
}

function* removeStateZipCodesSaga(action) {
  const stateName = action.payload;
  const additionalLocations = yield select(selectAdditionalLocations);

  // Define a function to filter the location objects
  const filteredAdditionalLocations = additionalLocations.filter(
    (location) => location.state !== stateName
  );

  // Now you have the filtered additionalLocations
  yield put(resetAdditionalLocations(filteredAdditionalLocations));
}

function* getAutocompleteCitiesSaga(action) {
  const response = yield call(api.searchLocations, action.payload);
  console.log(response);

  const results = response.data.results;
  const uniqueCities = new Set();

  results.forEach((location) => {
    if (location.city) {
      uniqueCities.add(`${location.city}, ${location.state}`);
    }
  });
  const currentCities = yield select(selectStateCities);
  let newValue = [...currentCities, ...uniqueCities];

  // add a max value to not overflow
  if (newValue.length > cityAutocompleteLimit) {
    newValue.slice(newValue.length - cityAutocompleteLimit);
  }
  yield put(getAutocompleteCitiesSuccess([...newValue]));
}

function* removeAutocompleteCitiesSaga(action) {
  const currentCities = yield select(selectStateCities);
  const state = action.payload;
  const filteredCities = currentCities.filter((city) => !city.endsWith(state));

  yield put(removeAutocompleteCitiesSuccess(filteredCities));
}

export default function* () {
  yield takeLatest(SEARCH_LOCATIONS_REQUEST, searchLocationsSaga);
  yield takeLatest(FETCH_LOCATIONS_REQUEST, fetchLocationsSaga);
  yield takeLatest(REMOVE_CITY_ZIP_CODES, removeCityZipCodesSaga);
  yield takeLatest(REMOVE_STATE_ZIP_CODES, removeStateZipCodesSaga);
  yield takeLatest(GET_AUTOCOMPLETE_CITIES_REQUEST, getAutocompleteCitiesSaga);
  yield takeLatest(
    REMOVE_AUTOCOMPLETE_CITIES_REQUEST,
    removeAutocompleteCitiesSaga
  );
}
