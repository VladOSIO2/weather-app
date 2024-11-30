import {
  WeatherApiAutoCompleteResponse,
  WeatherApiForecastDayInfo,
  WeatherApiForecastResponse,
  WeatherApiLocationWithTime,
} from '@/services/weatherapi/types';

export type ForecastState = {
  cityWeatherId?: number;
  forecastData?: WeatherApiForecastResponse;
  isForecastLoading: boolean;

  autoCompleteData?: WeatherApiAutoCompleteResponse;
  isAutoCompleteLoading: boolean;

  weatherDetailsDay?: WeatherApiForecastDayInfo;
  weatherDetailsLocation?: WeatherApiLocationWithTime;
};
