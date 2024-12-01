export interface WeatherApiForecastResponse {
  location: WeatherApiLocationWithTime;
  current: WeatherApiCurrent;
  forecast: WeatherApiForecast;
}

export type WeatherApiSearchResultResponse = WeatherApiSearchResultItem[];

export interface WeatherApiSearchResultItem {
  id: number;
  name: string;
  region?: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface WeatherApiLocation {
  id: string;
  name: string;
  region?: string;
  country: string;
  lat: number;
  lon: number;
}

export type WeatherApiPseudoBoolean = 0 | 1;

export interface WeatherApiLocationWithTime extends WeatherApiLocation {
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface WeatherApiCurrent extends WeatherApiDetails {
  last_updated_epoch: number;
  last_updated: string;
}

export interface WeatherApiDetails {
  is_day: WeatherApiPseudoBoolean;
  condition: WeatherApiCondition;
  temp_c: number;
  temp_f: number;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  humidity: number;
  cloud: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
}

export interface WeatherApiCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherApiForecast {
  forecastday: WeatherApiForecastDayInfo[];
}

export interface WeatherApiForecastDayInfo {
  date: string;
  date_epoch: number;
  day: WeatherApiForecastDay;
  astro: WeatherApiForecastAstro;
  hour: WeatherApiForecastHour[];
}

export interface WeatherApiForecastAstro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: WeatherApiPseudoBoolean;
  is_sun_up: WeatherApiPseudoBoolean;
}

export interface WeatherApiForecastDay {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: WeatherApiPseudoBoolean;
  daily_chance_of_rain: number;
  daily_will_it_snow: WeatherApiPseudoBoolean;
  daily_chance_of_snow: number;
  condition: WeatherApiCondition;
  uv: number;
}

export interface WeatherApiForecastHour extends WeatherApiDetails {
  time_epoch: number;
  time: string;
  snow_cm: number;
  will_it_rain: WeatherApiPseudoBoolean;
  chance_of_rain: number;
  will_it_snow: WeatherApiPseudoBoolean;
  chance_of_snow: number;
}
