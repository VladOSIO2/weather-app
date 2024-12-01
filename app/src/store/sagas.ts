import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { userSaga } from './user/user.saga';
import forecastSaga from './weather/weather.saga';
import { favoriteCitiesSaga } from './favoriteCities/favoriteCities.saga';

const sagas = [userSaga, forecastSaga, favoriteCitiesSaga];

export function* rootSaga() {
  yield all(sagas.map(fork));
}
