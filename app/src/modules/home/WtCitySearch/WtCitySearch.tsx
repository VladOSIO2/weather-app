'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearAutoComplete,
  fetchAutoComplete,
  fetchForecast,
} from '@/store/weather/weather.slice';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import {
  selectSearchResults,
  selectSearchResultsLoading,
} from '@/store/weather/weather.selectors';
import { buildCityNameDetails } from '@/lib/utils/string-utils';
import { CITY_SEARCH_PLACEHOLDER } from '../home.constants';
import SpinnerIcon from '@/components/icons/spinner.svg';

const WtCitySearch = () => {
  const dispatch = useAppDispatch();

  const isSearchResultsLoading = useAppSelector(selectSearchResultsLoading);
  const searchResult = useAppSelector(selectSearchResults);

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(isSearchResultsLoading);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setIsLoading(isSearchResultsLoading);
  }, [isSearchResultsLoading]);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(fetchAutoComplete(debouncedSearch));
    }
  }, [dispatch, debouncedSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setIsLoading(!!value);
      setSearch(value);
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

  const renderLoadingState = useMemo(() => {
    return (
      <div className="absolute left-0 right-0 top-12 flex h-10 items-center rounded-lg border-2 border-gray-300 bg-blue-50 pl-2">
        <SpinnerIcon className="h-5 w-5 text-blue-950" />
      </div>
    );
  }, []);

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
    <div className="relative w-full max-w-md">
      <input
        value={search}
        onChange={handleInputChange}
        type="text"
        placeholder={CITY_SEARCH_PLACEHOLDER}
        className="w-full rounded-lg border-2 border-gray-300 p-1 pl-2 text-lg text-blue-950 outline-none duration-200 focus:border-blue-400"
      />

      {isLoading ? renderLoadingState : renderSearchResult}
    </div>
  );
};

export default WtCitySearch;
