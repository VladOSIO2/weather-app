import WtInfoCard from '@/components/WtInfoCard/WtInfoCard';
import React from 'react';
import { WtDetailsTemperatureProps } from './WtDetailsTemperature.types';
import { convertDateStrToLocaleString } from '@/lib/utils/weather-time-utils';
import Image from 'next/image';

const WtDetailsTemperature: React.FC<WtDetailsTemperatureProps> = ({
  day,
  date,
}) => {
  const {
    maxtemp_c,
    mintemp_c,
    maxtemp_f,
    mintemp_f,
    avgtemp_c,
    avgtemp_f,
    condition,
  } = day;

  return (
    <WtInfoCard>
      <p className="text-lg">{convertDateStrToLocaleString(date)}</p>
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
          <p className="text-lg">
            <b>avg:</b> {avgtemp_c}°C / {avgtemp_f}°F
          </p>
          <p className="text-lg">{condition.text}</p>
        </div>
      </div>
    </WtInfoCard>
  );
};

export default WtDetailsTemperature;