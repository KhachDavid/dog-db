import { put, call, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/dog.api';
import {
  FETCH_BREEDS_REQUEST,
  fetchBreedsSuccess,
  fetchBreedsFailure,
  // ...other action types and action creators
} from '../actions/dog.actions';

function* fetchBreedsSaga() {
  try {
    const response = yield call(api.fetchBreeds);
    yield put(fetchBreedsSuccess(response.data));
  } catch (error) {
    yield put(fetchBreedsFailure(error));
  }
}

// Define other sagas for different actions...

export default function* () {

  yield takeLatest(FETCH_BREEDS_REQUEST, fetchBreedsSaga);
  // Add other watchers here...
}
