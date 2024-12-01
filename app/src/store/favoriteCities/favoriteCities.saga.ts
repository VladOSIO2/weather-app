import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  clearDetailsCity,
  fetchDetailsCity,
  setDetailsCity,
  setIsLoadingDetailsCity,
  setIsValidFavoriteCities,
  toggleDetailsCity,
} from './favoriteCities.slice';
import { ErrorHandler } from '@/services/error-handler/error-handler';
import { SagaIterator } from 'redux-saga';
import { selectUserId } from '../user/user.selectors';
import { selectDetailsCity } from './favoriteCities.selectors';
import {
  selectCityWeatherId,
  selectWeatherDetailsLocation,
} from '../weather/weather.selectors';
import { buildCityName } from '@/lib/utils/string-utils';

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
  const detailsCity = yield select(selectDetailsCity);

  yield put(setIsLoadingDetailsCity(true));

  try {
    if (detailsCity) {
      yield call(fetch, `/api/users/${userId}/favorites/${detailsCity.id}`, {
        method: 'DELETE',
      });

      yield put(clearDetailsCity());
    } else {
      const detailsLocation = yield select(selectWeatherDetailsLocation);
      const detailsCityWeatherId = yield select(selectCityWeatherId);
      const cityName = buildCityName(
        detailsLocation.city,
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

export function* favoriteCitiesSaga() {
  yield takeEvery(fetchDetailsCity, fetchDetailsCitySaga);
  yield takeEvery(toggleDetailsCity, toggleDetailsCitySaga);
}
