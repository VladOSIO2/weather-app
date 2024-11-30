import { signJwt } from '@/lib/security/jwt';
import { findUserSignIn } from '@/services/db/user/user.service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  const user = await findUserSignIn(email, password);

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 },
    );
  }

  const accessToken = signJwt({ sub: user.id });

  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.JWT_EXPIRES_IN) / 1000,
    path: '/',
    sameSite: 'none',
  });

  return NextResponse.json(user);
}
