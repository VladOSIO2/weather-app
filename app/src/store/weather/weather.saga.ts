import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
  clearWeatherDetailsError,
  fetchAutoComplete,
  fetchForecast,
  fetchWeatherDetailsLazy,
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
import { getCurrentDateIsoStr } from '@/lib/utils/weather-time-utils';

function* fetchForecastSaga({
  payload,
}: PayloadAction<string>): SagaIterator<void> {
  yield put(setForecastLoading(true));
  yield put(setCityWeatherId(payload));

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

  const dateString = payload.date ?? getCurrentDateIsoStr();

  const storeCityWeatherId = yield select(selectCityWeatherId);
  const storeWeatherDetailsDay: WeatherApiForecastDayInfo | undefined =
    yield select(selectWeatherDetailsDay);
  const storeWeatherDetailsDate = storeWeatherDetailsDay?.date;

  if (
    Boolean(storeCityWeatherId) &&
    Boolean(storeWeatherDetailsDay) &&
    String(storeCityWeatherId) === payload.cityWeatherId &&
    storeWeatherDetailsDate === dateString
  ) {
    return;
  }

  if (!payload.cityWeatherId) {
    yield put(setWeatherDetailsError(WEATHER_DETAILS_ERROR_PARAMS));
    return;
  }

  yield put(setWeatherDetailsLoading(true));

  try {
    const weatherDetailsResponse = yield call(
      fetch,
      `/api/weather/details?q=id:${payload.cityWeatherId}&date=${dateString}`,
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
    yield put(setCityWeatherId(payload.cityWeatherId));
  } catch (error) {
    yield put(setWeatherDetailsError(WEATHER_DETAILS_ERROR_FETCH));
    ErrorHandler.handleError(error);
  } finally {
    yield put(setWeatherDetailsLoading(false));
  }
}

export default function* weatherSaga() {
  yield takeLatest(fetchForecast, fetchForecastSaga);
  yield takeLatest(fetchAutoComplete, fetchAutoCompleteSaga);
  yield takeLatest(fetchWeatherDetailsLazy, fetchWeatherDetailsSaga);
}
