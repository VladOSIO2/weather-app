import React, { memo } from 'react';
import { WtLocationNameProps } from './WtLocationName.types';

const WtLocationName: React.FC<WtLocationNameProps> = ({
  name,
  region,
  country,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="h-9 w-full max-w-md animate-pulse rounded-3xl bg-gray-200" />
    );
  }

  return (
    <p className="text-2xl">
      <span className="text-3xl font-bold">{name}</span>,{' '}
      {region ? `${region}, ` : ''}
      {country}
    </p>
  );
};

export default memo(WtLocationName);
