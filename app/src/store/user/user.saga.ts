import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUser, setUser, setUserLoading } from './user.slice';
import { SagaIterator } from 'redux-saga';
import { ErrorHandler } from '@/services/error-handler/error-handler';

function* fetchUserSaga(): SagaIterator<void> {
  yield put(setUserLoading(true));

  try {
    //TODO: make this everywhere
    const userResponse = yield call(
      fetch,
      new URL(
        '/api/auth/me',
        process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL,
      ),
    );
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
