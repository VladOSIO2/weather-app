import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { userSaga } from './user/user.saga';
import forecastSaga from './weather/forecast.saga';

const sagas = [userSaga, forecastSaga];

export function* rootSaga() {
  yield all(sagas.map(fork));
}
