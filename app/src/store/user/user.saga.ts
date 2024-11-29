import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUser, setUser, setUserLoading } from './user.slice';
import { SagaIterator } from 'redux-saga';

function* fetchUserSaga(): SagaIterator<void> {
  yield put(setUserLoading(true));

  const userResponse = yield call(fetch, 'http://localhost:3000/api/auth/me');
  const userJson = yield call([userResponse, 'json']);

  yield put(setUser(userJson));
  yield put(setUserLoading(false));
}

export function* userSaga() {
  yield takeLatest(fetchUser, fetchUserSaga);
}
