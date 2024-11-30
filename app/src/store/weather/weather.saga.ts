import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
  clearWeatherDetailsError,
  fetchAutoComplete,
  fetchWeatherDetailsIfNeeded,
  setAutoComplete,
  setAutoCompleteLoading,
  setCityWeatherId,
  setForecast,
  setForecastLoading,
  setWeatherDetails,
  setWeatherDetailsError,
  setWeatherDetailsLoading,
} from './weather.slice';
import { ErrorHandler } from '@/services/error-handler/error-handler';
import {
  selectCityWeatherId,
  selectWeatherDetailsDay,
} from './weather.selectors';
import {
  WEATHER_DETAILS_ERROR_FETCH,
  WEATHER_DETAILS_ERROR_INITIAL,
  WEATHER_DETAILS_ERROR_PARAMS,
} from './weather.constants';
import { WeatherApiForecastDayInfo } from '@/services/weatherapi/types';

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
      `/api/weather/search?q=${payload}`,
    );
    const autoCompleteJson = yield call([autoCompleteResponse, 'json']);

    yield put(setAutoComplete(autoCompleteJson));
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setAutoCompleteLoading(false));
  }
}

function* fetchWeatherDetailsSaga({
  payload,
}: PayloadAction<{
  cityWeatherId: string | null;
  date: string | null;
}>): SagaIterator<void> {
  yield put(clearWeatherDetailsError());

  const storeCityWeatherId = yield select(selectCityWeatherId);
  const storeWeatherDetailsDay: WeatherApiForecastDayInfo | undefined =
    yield select(selectWeatherDetailsDay);
  const storeWeatherDetailsDate = storeWeatherDetailsDay?.date;

  if (
    Boolean(storeCityWeatherId) &&
    Boolean(storeWeatherDetailsDay) &&
    String(storeCityWeatherId) === payload.cityWeatherId &&
    storeWeatherDetailsDate === payload.date
  ) {
    return;
  }

  if (!payload.cityWeatherId || !payload.date) {
    yield put(setWeatherDetailsError(WEATHER_DETAILS_ERROR_PARAMS));
    return;
  }

  yield put(setWeatherDetailsLoading(true));

  try {
    const weatherDetailsResponse = yield call(
      fetch,
      `/api/weather/details?q=id:${payload.cityWeatherId}&date=${payload.date}`,
    );
    const weatherDetailsJson = yield call([weatherDetailsResponse, 'json']);

    if (weatherDetailsJson.error) {
      yield put(setWeatherDetailsError(WEATHER_DETAILS_ERROR_FETCH));
      return;
    }

    if (weatherDetailsJson.message) {
      yield put(
        setWeatherDetailsError(
          WEATHER_DETAILS_ERROR_INITIAL + weatherDetailsJson.message,
        ),
      );
      return;
    }

    yield put(
      setWeatherDetails({
        location: weatherDetailsJson.location,
        day: weatherDetailsJson.forecast.forecastday[0],
      }),
    );
  } catch (error) {
    yield put(setWeatherDetailsError(WEATHER_DETAILS_ERROR_FETCH));
    ErrorHandler.handleError(error);
  } finally {
    yield put(setWeatherDetailsLoading(false));
  }
}

export default function* weatherSaga() {
  yield takeLatest(setCityWeatherId, setCityIdSaga);
  yield takeLatest(fetchAutoComplete, fetchAutoCompleteSaga);
  yield takeLatest(fetchWeatherDetailsIfNeeded, fetchWeatherDetailsSaga);
}
