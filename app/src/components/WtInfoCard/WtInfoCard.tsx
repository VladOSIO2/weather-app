import React from 'react';
import { WtInfoCardProps } from './WtInfoCard.types';

const WtInfoCard: React.FC<WtInfoCardProps> = ({ children }) => {
  return (
    <div className="flex-1 rounded-lg border-2 border-blue-300 p-4">
      {children}
    </div>
  );
};

export default WtInfoCard;
