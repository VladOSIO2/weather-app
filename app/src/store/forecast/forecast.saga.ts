import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  fetchForecast,
  setForecast,
  setForecastLoading,
} from './forecast.slice';

function* fetchForecastSaga({
  payload,
}: PayloadAction<string>): SagaIterator<void> {
  yield put(setForecastLoading(true));

  const forecastResponse = yield call(
    fetch,
    `/api/weather/forecast?search=${payload}`,
  );
  const forecastJson = yield call([forecastResponse, 'json']);

  yield put(setForecast(forecastJson));
  yield put(setForecastLoading(false));
}

export default function* forecastSaga() {
  yield takeLatest(fetchForecast, fetchForecastSaga);
}
