import React from 'react';
import { WtForecastCardProps } from './WtForecastCard.types';
import { convertDateStrToLocaleString } from '@/lib/utils/weather-time-utils';
import {
  buildDetailsUrl,
  buildTemperature,
  buildWeatherIconUrl,
} from '@/lib/utils/string-utils';
import Image from 'next/image';
import WtLinkButton from '@/components/WtLinkButton/WtLinkButton';

const WtForecastCard: React.FC<WtForecastCardProps> = ({
  forecastDay,
  onDetailsClick,
  cityWeatherId,
  isLoading,
}) => {
  const { maxtemp_c, mintemp_c, maxtemp_f, mintemp_f, condition } =
    forecastDay.day;

  if (isLoading) {
    return <div className="skeleton h-40 rounded-lg lg:max-w-80 lg:flex-1" />;
  }

  const renderWeatherInfo = (
    <div className="flex flex-row gap-4">
      <div className="min-h-20 min-w-20">
        <Image
          src={buildWeatherIconUrl(condition.icon)}
          alt={condition.text}
          width={80}
          height={80}
        />
      </div>
      <div className="mt-1">
        <p className="text-lg">
          <span className="font-bold">min:</span>{' '}
          {buildTemperature(mintemp_c, mintemp_f)}
        </p>
        <p className="text-lg">
          <span className="font-bold">max:</span>{' '}
          {buildTemperature(maxtemp_c, maxtemp_f)}
        </p>
        <p className="text-lg">{condition.text}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col rounded-lg border-2 border-blue-300 p-4 lg:max-w-80 lg:flex-1">
      <p className="text-lg">
        {convertDateStrToLocaleString(forecastDay.date)}
      </p>
      {renderWeatherInfo}

      <WtLinkButton
        href={buildDetailsUrl(cityWeatherId, forecastDay.date)}
        onClick={() => onDetailsClick(forecastDay)}
        className="ml-auto mt-2"
      >
        Details
      </WtLinkButton>
    </div>
  );
};

export default WtForecastCard;
