import { RootState } from '../store';

export const selectForecast = (state: RootState) => state.weather.forecastData;

export const selectCityWeatherId = (state: RootState) =>
  state.weather.cityWeatherId;

export const selectForecastLoading = (state: RootState) =>
  state.weather.isForecastLoading;

export const selectAutoComplete = (state: RootState) =>
  state.weather.autoCompleteData;

export const selectAutoCompleteLoading = (state: RootState) =>
  state.weather.isAutoCompleteLoading;

export const selectWeatherDetailsDay = (state: RootState) =>
  state.weather.weatherDetailsDay;

export const selectWeatherDetailsLocation = (state: RootState) =>
  state.weather.weatherDetailsLocation;

export const selectWeatherDetailsLoading = (state: RootState) =>
  state.weather.isWeatherDetailsLoading;

export const selectWeatherDetailsError = (state: RootState) =>
  state.weather.weatherDetailsError;
