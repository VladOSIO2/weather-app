'use client';

import WtButton from '@/components/WtButton/WtButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserLoading, selectUserName } from '@/store/user/user.selectors';
import { logout } from '@/store/user/user.slice';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const WtProfileHeader = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectUserLoading);
  const userName = useAppSelector(selectUserName);

  const router = useRouter();

  const renderHeader = isLoading ? (
    <div className="skeleton h-9 w-80 max-w-md rounded-3xl" />
  ) : (
    <h1 className="text-3xl font-semibold">Welcome, {userName}</h1>
  );

  const handleLogoutClick = useCallback(() => {
    dispatch(logout());
    router.push('/');
  }, [dispatch, router]);

  const renderLogoutButton = () => {
    return (
      <WtButton onClick={handleLogoutClick} className="ml-auto w-24">
        Logout
      </WtButton>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      {renderHeader}
      {renderLogoutButton()}
    </div>
  );
};

export default WtProfileHeader;
