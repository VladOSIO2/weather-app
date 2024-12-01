import React from 'react';
import { WtCurrentWeatherProps } from './WtCurrentWeather.types';
import {
  buildTemperature,
  buildWeatherIconUrl,
} from '@/lib/utils/string-utils';
import Image from 'next/image';
import { FORECAST_CURRENT_TITLE } from '../home.constants';

const WtCurrentWeather: React.FC<WtCurrentWeatherProps> = ({
  current,
  isLoading,
}) => {
  const { temp_c, temp_f, condition } = current;

  const renderTitle = isLoading ? (
    <div className="skeleton my-1 h-6 w-24 rounded-full" />
  ) : (
    <h2 className="text-2xl font-bold">{FORECAST_CURRENT_TITLE}</h2>
  );

  const renderImage = isLoading ? (
    <div className="skeleton h-20 w-20" />
  ) : (
    <div className="min-h-20 min-w-20">
      <Image
        src={buildWeatherIconUrl(condition.icon)}
        alt={condition.text}
        width={80}
        height={80}
      />
    </div>
  );

  const renderWeatherInfo = isLoading ? (
    <>
      <div className="skeleton my-1 h-5 w-32 rounded-full" />
      <div className="skeleton my-1 h-5 w-32 rounded-full" />
    </>
  ) : (
    <>
      <p className="text-lg">{buildTemperature(temp_c, temp_f)}</p>
      <p className="text-lg">{condition.text}</p>
    </>
  );

  return (
    <div className="flex flex-col gap-2">
      {renderTitle}
      <div className="flex flex-row gap-4">
        {renderImage}
        <div className="mt-1">{renderWeatherInfo}</div>
      </div>
    </div>
  );
};

export default WtCurrentWeather;
