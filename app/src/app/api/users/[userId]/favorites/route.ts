import { authenticateJwtCookieAndUserId } from '@/lib/security/authenticate';
import { findAllFavoriteCities } from '@/services/db/favoriteCity/favoriteCity.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ userId: string }> }>,
) {
  const { userId } = await params;

  const response = authenticateJwtCookieAndUserId(request, userId);

  if (response instanceof NextResponse) {
    return response;
  }

  const favoriteCities = await findAllFavoriteCities(userId);

  return NextResponse.json({ cities: favoriteCities });
}
