import { put, call, takeLatest, select, delay } from "redux-saga/effects";
import * as api from "../../api/dog.api";
import {
  FETCH_BREEDS_REQUEST,
  fetchBreedsSuccess,
  fetchBreedsFailure,
  SEARCH_DOGS_REQUEST,
  searchDogsSuccess,
  searchDogsFailure,
  FETCH_DOGS_REQUEST,
  fetchDogsFailure,
  fetchDogsSuccess,
  MATCH_DOGS_REQUEST,
  ADD_FAVORITES_REQUEST,
  addFavoritesSuccess,
  matchDogsSuccess,
  matchDogsFailure,
} from "../actions/dog.actions";
import { logoutSuccess } from "../actions/auth.actions";
import { selectFavorites } from "./selectors";
import { zipCodeSlice } from "../../constants/location.constants";
import { dogBatchCount } from "../../constants/dog.constants";
import { activateSnackbar } from "../actions/settings.actions";


function* fetchBreedsSaga() {
  try {
    const response = yield call(api.fetchBreeds);

    // parse response status
    const { status } = response;
    if (status === 401) {
      // if no longer authorized, log the user out
      yield put(logoutSuccess());
    }

    if (status === 200) {
      yield put(fetchBreedsSuccess(response.data));
    } else {
      yield put(fetchBreedsFailure(response));
    }
  } catch (error) {
    yield put(fetchBreedsFailure(error));

    if (error?.response?.status === 401) {
      yield put(logoutSuccess());
    } else {
      yield put(fetchBreedsFailure(error));
    }
  }
}

function* searchDogsSaga(action) {
  try {
    const { queryParams } = action;
    const { zipCodes } = action.queryParams || { zipCodes: [] }; // Set a default value if zipCodes are not provided

    // Caching case
    if (zipCodes && zipCodes.length > 0) {
      let totalNumberOfDogs = 0; // Initialize the count of total dogs
      let initialData = {
        resultIds: null,
        next: null,
        prev: null,
      };

      // Split the zipCodes into chunks
      for (let i = 0; i < zipCodes.length; i += zipCodeSlice) {
        let chunk = zipCodes.slice(i, i + zipCodeSlice);

        if (totalNumberOfDogs >= dogBatchCount * 4) {
          // If we have enough for 4 pages, stop the api calls
          break;
        }

        queryParams.zipCodes = chunk;
        // Introduce a delay before making the API call to avoid hitting rate limit
        yield delay(20);
        const response = yield call(api.searchDogs, queryParams);
        const { status } = response;

        if (status === 401) {
          // If no longer authorized, log the user out
          yield put(logoutSuccess());
          break; // Stop further requests if unauthorized
        }

        if (status === 200) {
          const newResultIds = response.data.resultIds;
          totalNumberOfDogs += newResultIds.length; // Increment the total number of dogs

          // first run
          if (initialData.resultIds === null) {
            // If the initialData doesn't have a resultIds, set it to newResultIds.
            initialData.resultIds = newResultIds;
            initialData.prev = null;
          } 
          // if there is still enough room in the current batch
          else if (initialData.resultIds.length + newResultIds.length < dogBatchCount) {
            initialData.resultIds = newResultIds.concat(initialData.resultIds);
          } else {
            // before starting a new batch
            // fill up any spots left in the last batch
            const spotsToFillUp = dogBatchCount - newResultIds.length;

            for (let i = 0; i < spotsToFillUp; i++) {
              newResultIds.push(initialData.resultIds.pop());
            }

            let newHead = {
              next: initialData,
              prev: null,
              resultIds: newResultIds,
            };
            initialData.prev = newHead;
            initialData = newHead;
          }
        } else {
          yield put(searchDogsFailure(response));
        }
      }

      initialData.total = totalNumberOfDogs;
      yield put(searchDogsSuccess(initialData, true));
    } else {
      // Normal API call
      const response = yield call(api.searchDogs, action.queryParams);

      const { status } = response;

      if (status === 401) {
        // If no longer authorized, log the user out
        yield put(logoutSuccess());
      }

      if (status === 200) {
        yield put(searchDogsSuccess(response.data, false));
      } else {
        yield put(searchDogsFailure(response));
      }
    }
  } catch (error) {
    yield put(searchDogsFailure(error));

    if (error?.response?.status === 401) {
      // If no longer authorized, log the user out
      yield put(logoutSuccess());
    }
  }
}

function* fetchDogsByIds(action) {
  try {
    const dogIds = action.payload;
    const response = yield call(api.fetchDogsByIds, dogIds);

    yield put(fetchDogsSuccess(response.data));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutSuccess());
    }

    yield put(fetchDogsFailure(error));
  }
}

function* matchDogsSaga() {
  try {
    const dogIDs = yield select(selectFavorites);
    const response = yield call(api.matchDog, dogIDs);
    const id = response.data.match;
    yield put(matchDogsSuccess(id));
  } catch (error) {
    yield put(matchDogsFailure(error));
  }
}

function* addFavoritesSaga(action) {
  try {
    const dogIDs = yield select(selectFavorites);
    if (dogIDs.length >= 100) {
      yield put(activateSnackbar("Cannot have more than 100 favorite dogs"))
      return;
    }
    else {
      yield put(addFavoritesSuccess(action.payload))
    }
  } catch (error) {

  }
}

export default function* () {
  yield takeLatest(FETCH_BREEDS_REQUEST, fetchBreedsSaga);
  yield takeLatest(SEARCH_DOGS_REQUEST, searchDogsSaga);
  yield takeLatest(FETCH_DOGS_REQUEST, fetchDogsByIds);
  yield takeLatest(MATCH_DOGS_REQUEST, matchDogsSaga);
  yield takeLatest(ADD_FAVORITES_REQUEST, addFavoritesSaga);
}
