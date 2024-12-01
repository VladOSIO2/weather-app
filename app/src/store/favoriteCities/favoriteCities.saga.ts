import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  clearDetailsCity,
  fetchDetailsCity,
  fetchFavoriteCities,
  setDetailsCity,
  setFavoriteCities,
  setIsLoadingDetailsCity,
  setIsLoadingFavoriteCities,
  setIsValidFavoriteCities,
  toggleDetailsCity,
} from './favoriteCities.slice';
import { ErrorHandler } from '@/services/error-handler/error-handler';
import { SagaIterator } from 'redux-saga';
import { selectUserId } from '../user/user.selectors';
import {
  selectDetailsCity,
  selectIsValidFavoriteCities,
} from './favoriteCities.selectors';
import {
  selectCityWeatherId,
  selectWeatherDetailsLocation,
} from '../weather/weather.selectors';
import { buildCityName } from '@/lib/utils/string-utils';
import { WeatherApiLocationWithTime } from '@/services/weatherapi/types';
import { FavoriteCitiesResponse, FavoriteCity } from './favoriteCities.types';

function* fetchDetailsCitySaga({
  payload,
}: PayloadAction<string>): SagaIterator<void> {
  const userId = yield select(selectUserId);

  yield put(setIsLoadingDetailsCity(true));

  try {
    const response = yield call(
      fetch,
      `/api/users/${userId}/favorites/${payload}`,
    );

    if (response.ok) {
      const data = yield response.json();
      yield put(setDetailsCity(data));
    }
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setIsLoadingDetailsCity(false));
  }
}

function* toggleDetailsCitySaga(): SagaIterator<void> {
  const userId = yield select(selectUserId);
  const detailsCity: FavoriteCity | undefined = yield select(selectDetailsCity);

  yield put(setIsLoadingDetailsCity(true));

  try {
    if (detailsCity) {
      yield call(
        fetch,
        `/api/users/${userId}/favorites/${detailsCity.weatherApiId}`,
        {
          method: 'DELETE',
        },
      );

      yield put(clearDetailsCity());
    } else {
      const detailsCityWeatherId = yield select(selectCityWeatherId);
      if (!detailsCityWeatherId) return;

      const detailsLocation: WeatherApiLocationWithTime = yield select(
        selectWeatherDetailsLocation,
      );
      const cityName = buildCityName(
        detailsLocation.name,
        detailsLocation.country,
        detailsLocation.region,
      );

      const response = yield call(
        fetch,
        `/api/users/${userId}/favorites/${detailsCityWeatherId}`,
        {
          method: 'POST',
          body: JSON.stringify({ cityName }),
        },
      );

      const responseData = yield call([response, 'json']);

      yield put(setDetailsCity(responseData));
    }
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setIsLoadingDetailsCity(false));
    yield put(setIsValidFavoriteCities(false));
  }
}

function* fetchFavoriteCitiesSaga(): SagaIterator<void> {
  const isValid = yield select(selectIsValidFavoriteCities);
  if (isValid) return;

  const userId = yield select(selectUserId);

  yield put(setIsLoadingFavoriteCities(true));

  try {
    const response = yield call(fetch, `/api/users/${userId}/favorites`);

    if (response.ok) {
      const data: FavoriteCitiesResponse = yield call([response, 'json']);
      yield put(setFavoriteCities(data.cities));
    }
  } catch (error) {
    ErrorHandler.handleError(error);
  } finally {
    yield put(setIsLoadingFavoriteCities(false));
  }
}

export function* favoriteCitiesSaga() {
  yield takeEvery(fetchDetailsCity, fetchDetailsCitySaga);
  yield takeEvery(toggleDetailsCity, toggleDetailsCitySaga);
  yield takeEvery(fetchFavoriteCities, fetchFavoriteCitiesSaga);
}
