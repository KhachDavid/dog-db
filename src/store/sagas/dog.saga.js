import { put, call, takeLatest, select } from 'redux-saga/effects';
import * as api from '../../api/dog.api';
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
} from '../actions/dog.actions';
import { logoutSuccess } from '../actions/auth.actions';
import { selectDogIds } from './selectors';

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
    }
    else {
      yield put(fetchBreedsFailure(response));
    }
  } catch (error) {
    yield put(fetchBreedsFailure(error));

    if (error.response.status === 401) {
        yield put(logoutSuccess());
    }
  }
}

function* searchDogsSaga() {
  try {
    const response = yield call(api.searchDogs, {});

    // parse response status
    const { status } = response;

    if (status === 401) {
      // if no longer authorized, log the user out
      yield put(logoutSuccess());
    } 
    
    if (status === 200) {
      yield put(searchDogsSuccess(response.data));
    }
    else {
      yield put(searchDogsFailure(response));
    }
  } catch (error) {
    yield put(searchDogsFailure(error));
  }
}

function* fetchDogsByIds() {
  try {
    const dogIds = yield select(selectDogIds);
    const response = yield call(api.fetchDogsByIds, dogIds);

    yield put(fetchDogsSuccess(response.data));
  } catch (error) {
    yield put(fetchDogsFailure(error));
  }
}

// Define other sagas for different actions...

export default function* () {
  yield takeLatest(FETCH_BREEDS_REQUEST, fetchBreedsSaga);
  yield takeLatest(SEARCH_DOGS_REQUEST, searchDogsSaga);
  yield takeLatest(FETCH_DOGS_REQUEST, fetchDogsByIds);
}
