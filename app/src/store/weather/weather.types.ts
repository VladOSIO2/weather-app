import {
  WeatherApiAutoCompleteResponse,
  WeatherApiForecastDayInfo,
  WeatherApiForecastResponse,
  WeatherApiLocationWithTime,
} from '@/services/weatherapi/types';

export type WeatherState = {
  cityWeatherId?: string;
  forecastData?: WeatherApiForecastResponse;
  isForecastLoading: boolean;

  autoCompleteData?: WeatherApiAutoCompleteResponse;
  isAutoCompleteLoading: boolean;

  isWeatherDetailsLoading: boolean;
  weatherDetailsError?: string;
  weatherDetailsDay?: WeatherApiForecastDayInfo;
  weatherDetailsLocation?: WeatherApiLocationWithTime;
};
