import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState } from './weather.types';
import {
  WeatherApiAutoCompleteResponse,
  WeatherApiForecastDayInfo,
  WeatherApiForecastResponse,
  WeatherApiLocationWithTime,
} from '@/services/weatherapi/types';

const initialState: WeatherState = {
  isForecastLoading: false,

  autoCompleteData: [],
  isAutoCompleteLoading: false,

  isWeatherDetailsLoading: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setForecast: (
      state,
      { payload }: PayloadAction<WeatherApiForecastResponse>,
    ) => {
      state.forecastData = payload;
    },

    clearForecast: (state) => {
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

    setCityWeatherId: (state, { payload }: PayloadAction<string>) => {
      state.cityWeatherId = payload;
    },

    setWeatherDetails: (
      state,
      {
        payload,
      }: PayloadAction<{
        day: WeatherApiForecastDayInfo;
        location: WeatherApiLocationWithTime;
      }>,
    ) => {
      state.weatherDetailsDay = payload.day;
      state.weatherDetailsLocation = payload.location;
    },

    setWeatherDetailsError: (state, { payload }: PayloadAction<string>) => {
      state.weatherDetailsError = payload;
    },

    clearWeatherDetailsError: (state) => {
      state.weatherDetailsError = undefined;
    },

    setWeatherDetailsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isWeatherDetailsLoading = payload;
    },
  },
});

export const fetchForecast = createAction<string>('weather/fetchForecast');
export const fetchAutoComplete = createAction<string>(
  'weather/fetchAutoComplete',
);
export const fetchWeatherDetailsIfNeeded = createAction<{
  cityWeatherId: string | null;
  date: string | null;
}>('weather/fetchWeatherDetailsIfNeeded');

export const {
  setForecast,
  clearForecast,
  setForecastLoading,
  setAutoComplete,
  setAutoCompleteLoading,
  clearAutoComplete,
  setCityWeatherId,
  setWeatherDetails,
  setWeatherDetailsError,
  clearWeatherDetailsError,
  setWeatherDetailsLoading,
} = weatherSlice.actions;
