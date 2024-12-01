'use client';

import React, { useEffect } from 'react';
import {
  selectForecast,
  selectCityWeatherId,
  selectForecastLoading,
} from '@/store/weather/weather.selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForecast,
  setWeatherDetails,
} from '@/store/weather/weather.slice';
import {
  WeatherApiForecastDayInfo,
  WeatherApiLocationWithTime,
} from '@/services/weatherapi/types';
import WtLocationName from '@/components/WtLocationName/WtLocationName';
import {
  FORECAST_CARDS_TITLE,
  FORECAST_RESULT_EMPTY_TEXT,
} from '../home.constants';
import WtCurrentWeather from '../WtCurrentWeather/WtCurrentWeather';
import WtForecastCard from '../WtForecastCard/WtForecastCard';

const WtHomeWeatherResult = () => {
  const dispatch = useDispatch();

  const cityWeatherId = useSelector(selectCityWeatherId);
  const forecastData = useSelector(selectForecast);
  const isLoading = useSelector(selectForecastLoading);

  useEffect(() => {
    return () => {
      dispatch(clearForecast());
    };
  }, [dispatch]);

  const handleDetailsClick = (forecastDay: WeatherApiForecastDayInfo) => {
    dispatch(
      setWeatherDetails({
        day: forecastDay,
        location: forecastData?.location as WeatherApiLocationWithTime,
      }),
    );
  };

  if (!forecastData) {
    return (
      <h1 className="p-4 text-center text-2xl">{FORECAST_RESULT_EMPTY_TEXT}</h1>
    );
  }

  const { location, current, forecast } = forecastData;

  const renderForecastTitle = isLoading ? (
    <div className="skeleton my-1 h-6 w-28 rounded-full" />
  ) : (
    <h2 className="mt-4 text-2xl font-bold">{FORECAST_CARDS_TITLE}</h2>
  );

  const renderForecastCards = (
    <div className="flex flex-col justify-center gap-4 lg:flex-row">
      {forecast.forecastday.map((forecastDay) => (
        <WtForecastCard
          key={forecastDay.date}
          forecastDay={forecastDay}
          cityWeatherId={cityWeatherId as string}
          onDetailsClick={handleDetailsClick}
          isLoading={isLoading}
        />
      ))}
    </div>
  );

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <WtLocationName
        name={location.name}
        region={location.region}
        country={location.country}
        isLoading={isLoading}
      />

      <WtCurrentWeather current={current} isLoading={isLoading} />

      <div className="flex flex-col gap-2">
        {renderForecastTitle}
        {renderForecastCards}
      </div>
    </div>
  );
};

export default WtHomeWeatherResult;
