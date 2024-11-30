import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForecastState } from './forecast.types';
import { WeatherApiForecastResponse } from '@/services/weatherapi/types';

const initialState: ForecastState = {
  isLoading: false,
};

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setForecast: (
      state,
      { payload }: PayloadAction<WeatherApiForecastResponse>,
    ) => {
      state.data = payload;
    },

    clearForecast: (state) => {
      state.data = undefined;
      state.isLoading = false;
    },

    setForecastLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const fetchForecast = createAction<string>('forecast/fetchForecast');

export const { setForecast, clearForecast, setForecastLoading } =
  forecastSlice.actions;
