import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForecastState } from './forecast.types';
import {
  WeatherApiAutoCompleteResponse,
  WeatherApiForecastResponse,
} from '@/services/weatherapi/types';

const initialState: ForecastState = {
  isForecastLoading: false,

  autoCompleteData: [],
  isAutoCompleteLoading: false,
};

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setForecast: (
      state,
      { payload }: PayloadAction<WeatherApiForecastResponse>,
    ) => {
      state.forecastData = payload;
    },

    clearForecast: (state) => {
      state.cityWeatherId = undefined;
      state.forecastData = undefined;
      state.isForecastLoading = false;
    },

    setForecastLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isForecastLoading = payload;
    },

    setAutoComplete: (
      state,
      { payload }: PayloadAction<WeatherApiAutoCompleteResponse>,
    ) => {
      state.autoCompleteData = payload;
    },

    clearAutoComplete: (state) => {
      state.autoCompleteData = [];
    },

    setAutoCompleteLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isAutoCompleteLoading = payload;
    },

    setCityWeatherId: (state, { payload }: PayloadAction<number>) => {
      state.cityWeatherId = payload;
    },
  },
});

export const fetchAutoComplete = createAction<string>(
  'forecast/fetchAutoComplete',
);

export const {
  setForecast,
  clearForecast,
  setForecastLoading,
  setAutoComplete,
  setAutoCompleteLoading,
  clearAutoComplete,
  setCityWeatherId,
} = forecastSlice.actions;
