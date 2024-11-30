'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  selectForecastLoading,
  selectForecast,
  selectCityWeatherId,
} from '@/store/weather/weather.selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForecast,
  setWeatherDetails,
} from '@/store/weather/weather.slice';
import WtLinkButton from '@/components/WtLinkButton/WtLinkButton';
import {
  WeatherApiForecastDayInfo,
  WeatherApiLocationWithTime,
} from '@/services/weatherapi/types';
import WtLocationName from '@/components/WtLocationName/WtLocationName';
import { convertDateStrToLocaleString } from '@/lib/utils/weather-time-utils';

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

  //TODO:
  if (!forecastData) {
    return <div>No data</div>;
  }

  //TODO:
  if (isLoading) {
    return <div>LOADING...</div>;
  }

  //TODO: not found forecast

  const { location, current, forecast } = forecastData;

  //TODO: add current time (UTC, local)
  const renderCurrent = () => {
    const { temp_c, temp_f, condition } = current;

    return (
      <>
        <h2 className="mt-4 text-2xl font-bold">Current</h2>
        <div className="flex flex-row gap-4">
          <div className="min-h-20 min-w-20">
            <Image
              src={`https:${condition.icon}`}
              alt={condition.text}
              width={80}
              height={80}
            />
          </div>
          <div className="mt-1">
            <p className="text-lg">
              {temp_c}°C / {temp_f}°F
            </p>
            <p className="text-lg">{condition.text}</p>
          </div>
        </div>
      </>
    );
  };

  const renderForecast = (
    <div>
      <h2 className="mt-4 text-2xl font-bold">Forecast</h2>

      <div className="flex flex-col justify-center gap-4 lg:flex-row">
        {forecast.forecastday.map((forecastDay) => {
          const { maxtemp_c, mintemp_c, maxtemp_f, mintemp_f, condition } =
            forecastDay.day;

          //TODO: WtDetailsCard
          return (
            <div
              key={forecastDay.date}
              className="flex flex-col rounded-lg border-2 border-blue-300 p-4 lg:max-w-80 lg:flex-1"
            >
              <p className="text-lg">
                {convertDateStrToLocaleString(forecastDay.date)}
              </p>
              <div className="flex flex-row gap-4">
                <div className="min-h-20 min-w-20">
                  <Image
                    src={`https:${condition.icon}`}
                    alt={condition.text}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="mt-1">
                  <p className="text-lg">
                    <b>min:</b> {mintemp_c}°C / {mintemp_f}°F
                  </p>
                  <p className="text-lg">
                    <b>max:</b> {maxtemp_c}°C / {maxtemp_f}°F
                  </p>
                  <p className="text-lg">{condition.text}</p>
                </div>
              </div>

              <WtLinkButton
                href={`/details?id=${cityWeatherId}&date=${forecastDay.date}`}
                onClick={() => handleDetailsClick(forecastDay)}
                className="ml-auto mt-2"
              >
                Details
              </WtLinkButton>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <WtLocationName
        name={location.name}
        region={location.region}
        country={location.country}
        isLoading={isLoading}
      />

      {renderCurrent()}
      {renderForecast}
    </div>
  );
};

export default WtHomeWeatherResult;
