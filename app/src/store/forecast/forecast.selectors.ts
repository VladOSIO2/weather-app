import { RootState } from '../store';

export const selectForecast = (state: RootState) => state.forecast.forecastData;

export const selectForecastLoading = (state: RootState) =>
  state.forecast.isForecastLoading;

export const selectAutoComplete = (state: RootState) =>
  state.forecast.autoCompleteData;

export const selectAutoCompleteLoading = (state: RootState) =>
  state.forecast.isAutoCompleteLoading;
