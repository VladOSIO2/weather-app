import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);

  return NextResponse.json({ message: 'Logged out' });
}
