import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  selectAdditionalLocations,
  selectStateCities,
  selectCities,
} from "./selectors";
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
  cachedStateLocations,
  searchLocationsFailure,
} from "../actions/location.actions";

import { logoutSuccess } from "../actions/auth.actions";

import * as api from "../../api/location.api";
import {
  INVALID_ZIP_CODE,
  cityAutocompleteLimit,
  mapStatesToAbbr,
} from "../../constants/location.constants";
import { dogsNotCached } from "../actions/dog.actions";

function* searchLocationsSaga(action) {
  try {
    const response = yield call(api.searchLocations, action.payload);
    const additionalLocations = yield select(selectAdditionalLocations);

    if (response.status !== 200) {
      yield put(searchLocationsFailure("Failed to retrieve locations"));
      return;
    }

    let newData = response.data.results;
    let filteredResults = additionalLocations;
    if (action.payload.states && action.payload.city) {
      newData = newData.filter((obj) => obj.city === action.payload.city);

      // case when we are searching for a city in a state
      let currentCities = yield select(selectCities) || [];
      // if it is the first city search filter previous state searches
      if (currentCities.length === 1) {
        let state = action.payload.states[0];
        filteredResults = additionalLocations.filter(
          (res) => res.state !== state
        );
      }
    } else if (action.payload.states && !action.payload.city) {
      // case when we are just searching for state
      yield put(cachedStateLocations(action.payload.states[0], newData));
    } else if (!action.payload.states && action.payload.city) {
      // this means the user only searches for a city
      // in this case we put cities to stateCities as an autocomplete option
      const uniqueValues = [
        ...new Set(
          newData.map((resultObj) => `${resultObj.city}, ${resultObj.state}`)
        ),
      ];
      yield put(getAutocompleteCitiesSuccess(uniqueValues));
      return;
    }

    if (action.payload.geoBoundingBox) {
      // if newData is empty 
      if (newData.length === 0) {
        newData = [INVALID_ZIP_CODE]
      }

      yield put(searchLocationsSuccess(newData));
    } else {
      yield put(
        searchLocationsSuccess(alternateConcat(newData, filteredResults))
      );
    }
    yield put(dogsNotCached());
  } catch (error) {
    const { status } = error.response;
    if (status === 401) {
      yield put(logoutSuccess());
    }
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
  const filteredCities = currentCities.filter(
    (city) => !city.endsWith(mapStatesToAbbr(state))
  );

  yield put(removeAutocompleteCitiesSuccess(filteredCities));
}

function alternateConcat(newData, oldData) {
  const result = [];
  const newLength = newData.length;
  const oldLength = oldData.length;
  const repetitions = Math.ceil(newLength / 3); // Repeat old data after every 3 new data

  for (let i = 0; i < repetitions; i++) {
    const newStart = i * 3;
    const newEnd = Math.min(newStart + 3, newLength);
    const oldStart = i * 3;

    // Add the new data in chunks of 3 (or less if it's the last repetition).
    for (let j = newStart; j < newEnd; j++) {
      result.push(newData[j]);
    }

    // Add old data if available.
    if (oldStart < oldLength) {
      result.push(oldData[oldStart]);
    }
  }

  // Add any remaining old data after all the repetitions.
  for (let i = repetitions * 3; i < oldLength; i++) {
    result.push(oldData[i]);
  }

  return result;
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
