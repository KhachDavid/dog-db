import { all, call, spawn } from "redux-saga/effects";
import dogSaga from "./dog.saga";
import authSaga from "./auth.saga";
import locationSaga from "./location.saga";
import settingsSaga from "./settings.saga";

function errorHandler(error) {
  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  }
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
    { saga: settingsSaga, errorHandler },
  ];

  yield all(spawnSagasList(sagaList));
}
