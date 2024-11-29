import {
  WEATHER_API_CACHE_TTL,
  WEATHER_API_FORECAST_DAYS,
} from '@/constants/constants';
import { WEATHERAPI_ENDPOINTS } from '@/services/weatherapi/constants';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search');

  const url = new URL(WEATHERAPI_ENDPOINTS.FORECAST);
  url.searchParams.set('key', process.env.WEATHERAPI_KEY ?? '');
  url.searchParams.set('q', search ?? '');
  url.searchParams.set('days', WEATHER_API_FORECAST_DAYS);

  const weatherApiResponse = await fetch(url, {
    next: { revalidate: WEATHER_API_CACHE_TTL },
  });

  const data = await weatherApiResponse.json();

  return NextResponse.json(data);
};
