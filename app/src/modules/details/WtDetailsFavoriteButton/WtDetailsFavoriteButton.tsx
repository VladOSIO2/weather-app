'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import WtButton from '@/components/WtButton/WtButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { selectUserId } from '@/store/user/user.selectors';
import {
  fetchDetailsCity,
  toggleDetailsCity,
} from '@/store/favoriteCities/favoriteCities.slice';
import { useEffect } from 'react';
import {
  selectDetailsCity,
  selectIsLoadingDetailsCity,
} from '@/store/favoriteCities/favoriteCities.selectors';

const WtDetailsFavoriteButton = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const detailsCity = useAppSelector(selectDetailsCity);
  const isLoadingDetailsCity = useAppSelector(selectIsLoadingDetailsCity);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cityId = searchParams.get('id');

    if (userId && cityId) {
      dispatch(fetchDetailsCity(cityId));
    }
  }, [userId, searchParams]);

  const handleFavoritesClick = () => {
    if (userId) {
      dispatch(toggleDetailsCity());
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <WtButton onClick={handleFavoritesClick} disabled={isLoadingDetailsCity}>
      {detailsCity ? 'Remove from favorites' : 'Add to favorites'}
    </WtButton>
  );
};

export default WtDetailsFavoriteButton;
