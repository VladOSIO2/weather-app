import { WeatherApiForecastResponse } from '@/services/weatherapi/types';

export type ForecastState = {
  data?: WeatherApiForecastResponse;
  isLoading: boolean;
};
