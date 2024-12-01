import { WtLoadableProps } from '@/components/components.types';
import { WeatherApiCurrent } from '@/services/weatherapi/types';

export interface WtCurrentWeatherProps extends WtLoadableProps {
  current: WeatherApiCurrent;
}
