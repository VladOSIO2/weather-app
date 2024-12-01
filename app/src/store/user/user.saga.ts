import { call, put, takeLatest } from 'redux-saga/effects';
import {
  clearUser,
  fetchUser,
  logout,
  setUser,
  setUserLoading,
} from './user.slice';
import { SagaIterator } from 'redux-saga';
import { ErrorHandler } from '@/services/error-handler/error-handler';
import { clearFavoriteCities } from '../favoriteCities/favoriteCities.slice';

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

function* logoutSaga(): SagaIterator<void> {
  try {
    yield call(fetch, '/api/auth/logout', { method: 'POST' });
    yield put(clearUser());
    yield put(clearFavoriteCities());
  } catch (error) {
    ErrorHandler.handleError(error);
  }
}

export function* userSaga() {
  yield takeLatest(fetchUser, fetchUserSaga);
  yield takeLatest(logout, logoutSaga);
}
