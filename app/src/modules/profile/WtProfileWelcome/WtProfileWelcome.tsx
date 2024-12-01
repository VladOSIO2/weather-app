'use client';

import { useAppSelector } from '@/store/hooks';
import { selectUserLoading, selectUserName } from '@/store/user/user.selectors';

const WtProfileWelcome = () => {
  const isLoading = useAppSelector(selectUserLoading);
  const userName = useAppSelector(selectUserName);

  return isLoading ? (
    <div className="h-9 w-80 max-w-md animate-pulse rounded-3xl bg-gray-200" />
  ) : (
    <h1 className="text-3xl font-semibold">Welcome, {userName}</h1>
  );
};

export default WtProfileWelcome;
