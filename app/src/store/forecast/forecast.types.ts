import {
  WeatherApiAutoCompleteResponse,
  WeatherApiForecastResponse,
} from '@/services/weatherapi/types';

export type ForecastState = {
  cityWeatherId?: number;
  forecastData?: WeatherApiForecastResponse;
  isForecastLoading: boolean;

  autoCompleteData?: WeatherApiAutoCompleteResponse;
  isAutoCompleteLoading: boolean;
};
