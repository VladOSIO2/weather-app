'use client';

import React from 'react';
import SearchIcon from '@/components/icons/search.svg';
import { useAppDispatch } from '@/store/hooks';
import { fetchForecast } from '@/store/forecast/forecast.slice';

const WtCitySearch = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(fetchForecast(formData.get('search') as string));
  };

  return (
    <div>
      <form
        className="flex flex-row overflow-hidden rounded-md border-2 border-blue-400"
        onSubmit={handleSubmit}
      >
        <input
          id="searchInput"
          type="text"
          name="search"
          placeholder="Address, city or zip code"
          className="w-full rounded-l-md p-1 pl-2 text-lg text-blue-950 outline-none focus:ring-0"
        />
        <button type="submit" className="border-l-2 bg-slate-100 px-3 md:px-4">
          <SearchIcon className="h-6 w-6 text-blue-950" />
        </button>
      </form>
    </div>
  );
};

export default WtCitySearch;
