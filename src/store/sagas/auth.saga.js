// auth.saga.js
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  LOGOUT_REQUEST,
  logoutSuccess,
  logoutFailure,
} from '../actions/auth.actions';
import * as AuthAPI from '../../api/auth.api';
import { selectCurrentEmail, selectCurrentName } from './selectors';

// Worker Saga for login
function* login() {
  try {

    // select name and email
    const name = yield select(selectCurrentName);
    const email = yield select(selectCurrentEmail);

    // Call your API function for login
    const response = yield call(AuthAPI.login, { name, email });

    // parse response status
    const { status } = response;

    // Check if response is OK
    if (status !== 200) {
        // Dispatch a failure action with the error
        yield put(loginFailure(response));
        return;
    }

    // Dispatch a success action
    yield put(loginSuccess());
  } catch (error) {
    // Dispatch a failure action with the error
    yield put(loginFailure(error));
  }
}

// Worker Saga for logout
function* logout() {
  try {
    // Call your API function for logout
    yield call(AuthAPI.logout);

    // Dispatch a success action
    yield put(logoutSuccess());
  } catch (error) {
    // Dispatch a failure action with the error
    yield put(logoutFailure(error));
  }
}

// Watcher Saga to listen for login and logout requests
export default function* () {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT_REQUEST, logout);
}
