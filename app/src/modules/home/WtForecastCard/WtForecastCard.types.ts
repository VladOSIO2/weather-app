import { WtLoadableProps } from '@/components/components.types';
import { WeatherApiForecastDayInfo } from '@/services/weatherapi/types';

export interface WtForecastCardProps extends WtLoadableProps {
  forecastDay: WeatherApiForecastDayInfo;
  cityWeatherId: string;
  onDetailsClick: (forecastDay: WeatherApiForecastDayInfo) => void;
}
