import React from 'react';
import { WtErrorInfoProps } from './WtErrorInfo.types';
import WtLinkButton from '../WtLinkButton/WtLinkButton';

const WtErrorInfo: React.FC<WtErrorInfoProps> = ({ info }) => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-2xl">{info}</h1>
      <WtLinkButton href="/">Go back to the home page</WtLinkButton>
    </div>
  );
};

export default WtErrorInfo;
