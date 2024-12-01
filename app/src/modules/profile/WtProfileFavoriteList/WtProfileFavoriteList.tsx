'use client';

import WtInfoCard from '@/components/WtInfoCard/WtInfoCard';
import { buildDetailsUrl } from '@/lib/utils/string-utils';
import {
  selectFavoriteCities,
  selectIsLoadingFavoriteCities,
} from '@/store/favoriteCities/favoriteCities.selectors';
import { fetchFavoriteCities } from '@/store/favoriteCities/favoriteCities.slice';
import { FavoriteCity } from '@/store/favoriteCities/favoriteCities.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserId } from '@/store/user/user.selectors';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  PROFILE_FAVORITE_LIST_EMPTY_MESSAGE,
  PROFILE_FAVORITE_LIST_TITLE,
} from '../profile.constants';

const WtProfileFavoriteList = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const isLoading = useAppSelector(selectIsLoadingFavoriteCities);
  const favoriteCities = useAppSelector(selectFavoriteCities);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteCities());
    }
  }, [userId]);

  if (isLoading) {
    return <div className="skeleton h-6 w-80 max-w-md rounded-3xl" />;
  }

  const renderFavoriteCityLink = (city: FavoriteCity) => (
    <li
      key={city.weatherApiId}
      className="m-0 p-0 odd:bg-gray-50 even:bg-gray-100"
    >
      <Link
        href={buildDetailsUrl(city.weatherApiId)}
        className="text-md block p-2 duration-200 hover:bg-gray-200"
      >
        {city.cityName}
      </Link>
    </li>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold">{PROFILE_FAVORITE_LIST_TITLE}</h2>
      {favoriteCities && favoriteCities.length > 0 ? (
        <ul className="flex flex-col overflow-hidden rounded-lg border-2 border-blue-300">
          {favoriteCities.map(renderFavoriteCityLink)}
        </ul>
      ) : (
        <WtInfoCard>{PROFILE_FAVORITE_LIST_EMPTY_MESSAGE}</WtInfoCard>
      )}
    </div>
  );
};

export default WtProfileFavoriteList;
