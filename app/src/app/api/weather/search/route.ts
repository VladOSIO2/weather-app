import { WEATHER_API_CACHE_TTL } from '@/constants/constants';
import { WEATHERAPI_ENDPOINTS } from '@/services/weatherapi/constants';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const searchQuery = searchParams.get('search');

  const url = new URL(WEATHERAPI_ENDPOINTS.SEARCH);
  url.searchParams.set('key', process.env.WEATHERAPI_KEY ?? '');
  url.searchParams.set('q', searchQuery ?? '');

  const weatherApiResponse = await fetch(url, {
    next: { revalidate: WEATHER_API_CACHE_TTL },
  });

  const data = await weatherApiResponse.json();

  return NextResponse.json(data);
};
