import {
  WeatherApiSearchResultResponse,
  WeatherApiForecastDayInfo,
  WeatherApiForecastResponse,
  WeatherApiLocationWithTime,
} from '@/services/weatherapi/types';

export type WeatherState = {
  cityWeatherId?: string;
  forecastData?: WeatherApiForecastResponse;
  isForecastLoading: boolean;

  citySearchResults?: WeatherApiSearchResultResponse;
  isCitySearchResultsLoading: boolean;

  isWeatherDetailsLoading: boolean;
  weatherDetailsError?: string;
  weatherDetailsDay?: WeatherApiForecastDayInfo;
  weatherDetailsLocation?: WeatherApiLocationWithTime;
};
