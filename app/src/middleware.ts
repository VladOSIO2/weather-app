import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  console.log('MIDDLEWARE', req.nextUrl.pathname);

  const accessToken = req.cookies.get('accessToken')?.value;

  if (req.nextUrl.pathname === '/favorites') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/favorites'],
};
