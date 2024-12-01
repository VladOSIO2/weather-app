import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN_COOKIE_NAME } from './constants/constants';

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === '/profile') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/profile'],
};
