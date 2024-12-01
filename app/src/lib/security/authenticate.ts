import 'server-only';
import { verifyJwt } from './jwt';
import { NextRequest, NextResponse } from 'next/server';
import { CookieJwtPayload } from './jwt';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/constants';

/**
 * Authenticate the user by verifying the JWT token in the HTTP cookie.
 * @param request - The NextRequest object.
 * @returns The verified JWT payload if the token is valid, or a NextResponse to return an error if the token is invalid.
 */
export const authenticateJwtCookie = (
  request: NextRequest,
): CookieJwtPayload | NextResponse => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    return verifyJwt(accessToken);
  } catch (_e) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
};

export const authenticateJwtCookieAndUserId = (
  request: NextRequest,
  userId: string,
): CookieJwtPayload | NextResponse => {
  const response = authenticateJwtCookie(request);

  if (response instanceof NextResponse) {
    return response;
  }

  return response.sub === userId
    ? response
    : NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
};
