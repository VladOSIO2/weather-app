import React, { Suspense } from 'react';
import SpinnerIcon from '@/components/icons/spinner.svg';

const WtSuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <SpinnerIcon className="h-8 w-8 text-blue-950" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default WtSuspenseWrapper;
