import { all, call, spawn } from 'redux-saga/effects';
import dogSaga from './dog.saga';
import authSaga from './auth.saga';
import locationSaga from './location.saga';

function errorHandler(error) {
  console.log(error);
}

const spawnSagasList = (sagasList) =>
  sagasList.map(({ saga, errorHandler }) =>
    spawn(function* s() {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          yield* errorHandler(e);
        }
      }
    })
  );

export default function* rootSaga() {
  const sagaList = [
    { saga: authSaga, errorHandler },
    { saga: dogSaga, errorHandler },
    { saga: locationSaga, errorHandler },
  ];

  yield all(spawnSagasList(sagaList));
}
