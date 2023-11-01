// auth.saga.js
import { takeLatest, put, select } from 'redux-saga/effects';
import { selectSavedSearches } from './selectors';
import { ADD_SAVED_SEARCH, activateSnackbar, addSavedSearchSuccess } from '../actions/settings.actions';
import { MAX_SAVED_SEARCH } from '../../constants/settings.constants';

// Worker Saga for login
function* addSavedSearchWorker(action) {
  try {
    const savedSearches = yield select(selectSavedSearches);
    if (Object.keys(savedSearches).length >= MAX_SAVED_SEARCH) {
        yield put(activateSnackbar(`Could not save. Saved search is maxed out at ${MAX_SAVED_SEARCH}`))
    }
    else {
        yield put(addSavedSearchSuccess(action.payload))
        yield put(activateSnackbar(`Search Saved`))

    }
  } catch (error) {

  }
}

// Watcher Saga to listen for login and logout requests
export default function* () {
  yield takeLatest(ADD_SAVED_SEARCH, addSavedSearchWorker);
}
