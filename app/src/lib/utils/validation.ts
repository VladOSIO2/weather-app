import {
  MS_IN_DAY,
  WEATHER_API_MAX_DATE_DIFF_IN_DAYS,
} from '@/constants/constants';

const WEATHER_API_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const isValidWeatherApiDate = (date: string): boolean => {
  if (!WEATHER_API_DATE_REGEX.test(date)) {
    return false;
  }

  const dateObj = new Date(date);
  const today = new Date();
  const differenceInMs = Math.abs(dateObj.getTime() - today.getTime());
  const differenceInDays = differenceInMs / MS_IN_DAY;

  return differenceInDays <= WEATHER_API_MAX_DATE_DIFF_IN_DAYS;
};
