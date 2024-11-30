import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUser, setUser, setUserLoading } from './user.slice';
import { SagaIterator } from 'redux-saga';
import { ErrorHandler } from '@/services/error-handler/error-handler';

function* fetchUserSaga(): SagaIterator<void> {
  yield put(setUserLoading(true));

  try {
    const userResponse = yield call(fetch, '/api/auth/me');
    const userJson = yield call([userResponse, 'json']);

    yield put(setUser(userJson));
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setUserLoading(false));
  }
}

export function* userSaga() {
  yield takeLatest(fetchUser, fetchUserSaga);
}
