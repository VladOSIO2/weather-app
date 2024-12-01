import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken')?.value;
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
