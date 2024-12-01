'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearAutoComplete,
  fetchAutoComplete,
  fetchForecast,
} from '@/store/weather/weather.slice';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import { selectAutoComplete } from '@/store/weather/weather.selectors';
import { buildCityNameDetails } from '@/lib/utils/string-utils';

const WtCitySearch = () => {
  const dispatch = useAppDispatch();
  const searchResult = useAppSelector(selectAutoComplete);

  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(fetchAutoComplete(debouncedSearch));
    }
  }, [dispatch, debouncedSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const handleSearchResultClick = useCallback(
    (id: number) => {
      dispatch(fetchForecast(id.toString()));
      dispatch(clearAutoComplete());
      setSearch('');
    },
    [dispatch],
  );

  const renderSearchResult = useMemo(
    () =>
      searchResult &&
      searchResult.length > 0 && (
        <ul className="absolute left-0 right-0 top-12 overflow-hidden rounded-lg border-2 border-gray-300">
          {searchResult.map((result) => (
            <li className="odd:bg-blue-50 even:bg-blue-100" key={result.id}>
              <button
                onClick={() => handleSearchResultClick(result.id)}
                className="w-full bg-transparent p-2 text-left duration-200 hover:bg-blue-200 active:bg-blue-300"
              >
                <span className="text-blue-950">
                  {result.name},{' '}
                  {buildCityNameDetails(result.country, result.region)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ),
    [searchResult, handleSearchResultClick],
  );

  return (
    <div className="relative max-w-md">
      <input
        value={search}
        onChange={handleInputChange}
        id="searchInput"
        type="text"
        placeholder="Address, city or zip code"
        className="w-full rounded-lg border-2 border-gray-300 p-1 pl-2 text-lg text-blue-950 outline-none duration-200 focus:border-blue-400"
      />

      {renderSearchResult}
    </div>
  );
};

export default WtCitySearch;
