import { RootState } from '../store';

export const selectForecast = (state: RootState) => state.forecast.forecastData;

export const selectCityWeatherId = (state: RootState) =>
  state.forecast.cityWeatherId;

export const selectForecastLoading = (state: RootState) =>
  state.forecast.isForecastLoading;

export const selectAutoComplete = (state: RootState) =>
  state.forecast.autoCompleteData;

export const selectAutoCompleteLoading = (state: RootState) =>
  state.forecast.isAutoCompleteLoading;

export const selectWeatherDetailsDay = (state: RootState) =>
  state.forecast.weatherDetailsDay;

export const selectWeatherDetailsLocation = (state: RootState) =>
  state.forecast.weatherDetailsLocation;
