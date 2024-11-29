import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { userSaga } from './user/user.saga';

export function* rootSaga() {
  yield all([fork(userSaga)]);
}
