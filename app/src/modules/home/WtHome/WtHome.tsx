'use client';

import { useSearchParams } from 'next/navigation';
import WtHomeWeatherResult from '../WtHomeWeatherResult/WtHomeWeatherResult';
import useSWR from 'swr';

const WtHome = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  //TODO: add error & loading handling
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/weather/forecast?search=${searchQuery}`,
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false },
  );

  return (
    <div className="p-4">{data && <WtHomeWeatherResult data={data} />}</div>
  );
};

export default WtHome;
