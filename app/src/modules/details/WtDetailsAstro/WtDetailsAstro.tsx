import React from 'react';
import WtInfoCard from '@/components/WtInfoCard/WtInfoCard';
import { WtDetailsAstroProps } from './WtDetailsAstro.types';
import { convertTimeToLocal } from '@/lib/utils/weather-time-utils';

const WtDetailsAstro: React.FC<WtDetailsAstroProps> = ({
  sunrise,
  sunset,
  moonPhase,
}) => {
  return (
    <WtInfoCard>
      <div className="flex flex-col gap-2 text-lg">
        <div className="flex flex-row gap-2">
          <p className="w-[4.3rem] font-bold">Sunrise:</p>
          <div>
            <p>{sunrise} UTC</p>
            <p>{convertTimeToLocal(sunrise)} your local time</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="w-[4.3rem] font-bold">Sunset:</p>
          <div>
            <p>{sunset} UTC</p>
            <p>{convertTimeToLocal(sunset)} your local time</p>
          </div>
        </div>
        <p>
          <span className="font-bold">Moon phase:</span> {moonPhase}
        </p>
      </div>
    </WtInfoCard>
  );
};

export default WtDetailsAstro;
