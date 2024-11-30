'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { selectForecastLoading } from '@/store/forecast/forecast.selectors';
import { selectForecast } from '@/store/forecast/forecast.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { clearForecast } from '@/store/forecast/forecast.slice';

const WtHomeWeatherResult = () => {
  const dispatch = useDispatch();

  const forecastData = useSelector(selectForecast);
  const isLoading = useSelector(selectForecastLoading);

  useEffect(() => {
    return () => {
      dispatch(clearForecast());
    };
  }, [dispatch]);

  //TODO:
  if (isLoading) {
    return <div>LOADING...</div>;
  }

  //TODO:
  if (!forecastData) {
    return <div>No data</div>;
  }

  //TODO: not found forecast

  const { location, current, forecast } = forecastData;

  //TODO: handle region & country empty
  const renderLocation = (
    <p className="text-2xl">
      <span className="text-3xl font-bold">{location.name}</span>,{' '}
      {location.region}, {location.country}
    </p>
  );

  //TODO: add current time (UTC, local)
  const renderCurrent = () => {
    const { temp_c, temp_f, condition } = current;

    return (
      <>
        <h2 className="text-xl font-bold">Current</h2>
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
      <h2 className="text-xl font-bold">Forecast</h2>

      <div className="flex flex-col gap-4">
        {forecast.forecastday.map((forecastDay) => {
          const { maxtemp_c, mintemp_c, maxtemp_f, mintemp_f, condition } =
            forecastDay.day;

          return (
            <div
              key={forecastDay.date}
              className="rounded-lg border-2 border-blue-300 px-4 py-2"
            >
              <p className="text-lg">
                {new Date(forecastDay.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
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
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      {renderLocation}
      {renderCurrent()}
      {renderForecast}
    </div>
  );
};

export default WtHomeWeatherResult;
