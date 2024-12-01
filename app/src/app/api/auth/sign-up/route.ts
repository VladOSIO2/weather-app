import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/constants';
import { signJwt } from '@/lib/security/jwt';
import {
  findUserExists,
  createUserReturning,
} from '@/services/db/user/user.service';
import { cookies } from 'next/dist/server/request/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, username, password } = body;

  const isUserExists = await findUserExists(email);

  if (isUserExists) {
    return NextResponse.json(
      { message: 'User with provided email already exists. Please sign in.' },
      { status: 401 },
    );
  }

  const user = await createUserReturning(email, username, password);

  const accessToken = signJwt({ sub: user.id });

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.JWT_EXPIRES_IN),
    path: '/',
    sameSite: 'none',
  });

  return NextResponse.json(user);
}
