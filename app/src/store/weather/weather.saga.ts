import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  fetchAutoComplete,
  setAutoComplete,
  setAutoCompleteLoading,
  setCityWeatherId,
  setForecast,
  setForecastLoading,
} from './weather.slice';
import { ErrorHandler } from '@/services/error-handler/error-handler';

function* setCityIdSaga({
  payload,
}: PayloadAction<number>): SagaIterator<void> {
  yield put(setForecastLoading(true));

  try {
    const forecastResponse = yield call(
      fetch,
      `/api/weather/forecast?q=id:${payload}`,
    );
    const forecastJson = yield call([forecastResponse, 'json']);

    yield put(setForecast(forecastJson));
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setForecastLoading(false));
  }
}

function* fetchAutoCompleteSaga({
  payload,
}: PayloadAction<string>): SagaIterator<void> {
  yield put(setAutoCompleteLoading(true));

  try {
    const autoCompleteResponse = yield call(
      fetch,
      `/api/weather/search?search=${payload}`,
    );
    const autoCompleteJson = yield call([autoCompleteResponse, 'json']);

    yield put(setAutoComplete(autoCompleteJson));
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setAutoCompleteLoading(false));
  }
}

export default function* forecastSaga() {
  yield takeLatest(setCityWeatherId, setCityIdSaga);
  yield takeLatest(fetchAutoComplete, fetchAutoCompleteSaga);
}
