import { authenticateJwtCookieAndUserId } from '@/lib/security/authenticate';
import {
  createFavoriteCityReturning,
  deleteFavoriteCity,
  findFavoriteCity,
} from '@/services/db/favoriteCity/favoriteCity.service';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  {
    params,
  }: Readonly<{
    params: Promise<{ userId: string; cityId: string }>;
  }>,
) {
  const { userId, cityId } = await params;
  const response = authenticateJwtCookieAndUserId(request, userId);

  if (response instanceof NextResponse) {
    return response;
  }

  const favoriteCity = await findFavoriteCity(userId, cityId);

  if (!favoriteCity) {
    return NextResponse.json(
      { message: 'Favorite city not found' },
      { status: 404 },
    );
  }

  return NextResponse.json(favoriteCity);
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: Readonly<{
    params: Promise<{ userId: string; cityId: string }>;
  }>,
) {
  const { userId, cityId } = await params;
  const response = authenticateJwtCookieAndUserId(request, userId);

  if (response instanceof NextResponse) {
    return response;
  }

  const requestBody = await request.json();

  if (!requestBody.cityName) {
    return NextResponse.json(
      { message: 'City name is required' },
      { status: 400 },
    );
  }

  const favoriteCity = await createFavoriteCityReturning({
    userId,
    weatherApiId: cityId,
    cityName: requestBody.cityName,
  });

  return NextResponse.json(favoriteCity);
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: Readonly<{
    params: Promise<{ userId: string; cityId: string }>;
  }>,
) {
  const { userId, cityId } = await params;
  const response = authenticateJwtCookieAndUserId(request, userId);

  if (response instanceof NextResponse) {
    return response;
  }

  await deleteFavoriteCity(userId, cityId);

  return NextResponse.json({});
}
