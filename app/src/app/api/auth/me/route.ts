import { authenticateJwtCookie } from '@/lib/security/authenticate';
import { findUserById } from '@/services/db/user/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = authenticateJwtCookie(request);

  if (response instanceof NextResponse) {
    return response;
  }

  const user = await findUserById(response.sub);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
