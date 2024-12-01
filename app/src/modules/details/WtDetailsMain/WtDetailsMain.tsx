'use client';

import WtInfoCard from '@/components/WtInfoCard/WtInfoCard';
import WtLocationName from '@/components/WtLocationName/WtLocationName';
import { getWeatherSuggestion } from '@/lib/utils/weather-time-utils';
import {
  selectWeatherDetailsDay,
  selectWeatherDetailsError,
  selectWeatherDetailsLoading,
  selectWeatherDetailsLocation,
} from '@/store/weather/weather.selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import WtDetailsAstro from '../WtDetailsAstro/WtDetailsAstro';
import WtDetailsTemperature from '../WtDetailsTemperature/WtDetailsTemperature';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  clearWeatherDetails,
  fetchWeatherDetailsLazy,
} from '@/store/weather/weather.slice';
import WtErrorInfo from '@/components/WtErrorInfo/WtErrorInfo';
import WtDetailsFavoriteButton from '../WtDetailsFavoriteButton/WtDetailsFavoriteButton';

const WtDetailsMain = () => {
  const dispatch = useAppDispatch();

  const isDetailsLoading = useAppSelector(selectWeatherDetailsLoading);
  const detailsError = useAppSelector(selectWeatherDetailsError);
  const detailsDay = useAppSelector(selectWeatherDetailsDay);
  const detailsLocation = useAppSelector(selectWeatherDetailsLocation);

  const searchParams = useSearchParams();
  const paramCityWeatherId = searchParams.get('id');
  const paramDate = searchParams.get('date');

  useEffect(() => {
    dispatch(
      fetchWeatherDetailsLazy({
        cityWeatherId: paramCityWeatherId,
        date: paramDate,
      }),
    );
  }, [paramCityWeatherId, paramDate]);

  useEffect(() => {
    return () => {
      dispatch(clearWeatherDetails());
    };
  }, []);

  if (detailsError) {
    return <WtErrorInfo info={detailsError} />;
  }

  if (!detailsDay || !detailsLocation) {
    return null;
  }

  const { day, astro, date } = detailsDay;

  const renderWeatherSuggestion = () => {
    const suggestion = getWeatherSuggestion(day.avgtemp_c, day.condition.text);

    return (
      suggestion && (
        <WtInfoCard>
          <p className="text-lg">
            <b>Weather suggestion:</b> {suggestion}
          </p>
        </WtInfoCard>
      )
    );
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <WtLocationName
          name={detailsLocation.name}
          region={detailsLocation.region}
          country={detailsLocation.country}
          isLoading={isDetailsLoading}
        />
        <WtDetailsFavoriteButton />
      </div>

      {renderWeatherSuggestion()}

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center">
        <WtDetailsTemperature day={day} date={date} />

        <WtDetailsAstro
          sunrise={astro.sunrise}
          sunset={astro.sunset}
          moonPhase={astro.moon_phase}
          timezone={detailsLocation.tz_id}
          date={date}
        />

        <WtInfoCard>
          <p className="text-lg">
            <b>Max wind speed:</b> {day.maxwind_kph} kph / {day.maxwind_mph} mph
            <br />
            <b>Avg humidity:</b> {day.avghumidity}%
            <br />
            <b>Chance of rain:</b> {day.daily_chance_of_rain}%
            <br />
            <b>Chance of snow:</b> {day.daily_chance_of_snow}%
            <br />
            <b>UV index:</b> {day.uv}
          </p>
        </WtInfoCard>
      </div>
    </main>
  );
};

export default WtDetailsMain;
