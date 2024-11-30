import { RootState } from '../store';

export const selectForecast = (state: RootState) => state.forecast.data;

export const selectForecastLoading = (state: RootState) =>
  state.forecast.isLoading;
