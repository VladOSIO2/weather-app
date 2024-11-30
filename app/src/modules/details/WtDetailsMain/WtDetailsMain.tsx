'use client';

import WtInfoCard from '@/components/WtInfoCard/WtInfoCard';
import WtLocationName from '@/components/WtLocationName/WtLocationName';
import { getWeatherSuggestion } from '@/lib/utils/weather-time-utils';
import {
  selectWeatherDetailsDay,
  selectWeatherDetailsLocation,
} from '@/store/forecast/forecast.selectors';
import { useAppSelector } from '@/store/hooks';
import WtDetailsAstro from '../WtDetailsAstro/WtDetailsAstro';
import WtDetailsTemperature from '../WtDetailsTemperature/WtDetailsTemperature';

const WtDetailsMain = () => {
  const detailsDay = useAppSelector(selectWeatherDetailsDay);
  const detailsLocation = useAppSelector(selectWeatherDetailsLocation);

  //TODO: empty store handling
  if (!detailsDay || !detailsLocation) {
    return <div>Nothing</div>;
  }

  const { day, astro, date } = detailsDay;

  return (
    <main className="flex flex-col gap-4 p-4">
      <WtLocationName
        name={detailsLocation.name}
        region={detailsLocation.region}
        country={detailsLocation.country}
      />

      <WtInfoCard>
        <p className="text-lg">
          <b>Weather suggestion:</b>{' '}
          {getWeatherSuggestion(day.avgtemp_c, day.condition.text)}
        </p>
      </WtInfoCard>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center">
        <WtDetailsTemperature day={day} date={date} />

        <WtDetailsAstro
          sunrise={astro.sunrise}
          sunset={astro.sunset}
          moonPhase={astro.moon_phase}
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
