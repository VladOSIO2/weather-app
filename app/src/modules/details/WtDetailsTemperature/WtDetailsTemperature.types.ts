import { WeatherApiForecastDay } from '@/services/weatherapi/types';

export type WtDetailsTemperatureProps = {
  date: string;
  day: WeatherApiForecastDay;
};
