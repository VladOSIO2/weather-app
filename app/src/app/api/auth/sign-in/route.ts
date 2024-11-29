import { UserModel } from '@/models/user.model';
import { comparePassword } from '@/lib/bcrypt/bcrypt';
import { signJwt } from '@/lib/jwt/jwt';
import { dbPool } from '@/services/db/db';
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
    maxAge: Number(process.env.JWT_EXPIRES_IN),
    path: '/',
    sameSite: 'none',
  });

  return NextResponse.json(user);
}

async function findUserSignIn(
  email: string,
  password: string,
): Promise<UserModel | undefined> {
  const user = await dbPool.query(
    'SELECT id, name, password_hash FROM users WHERE email = $1',
    [email],
  );

  if (!user.rows.length) {
    return undefined;
  }

  const userData = user.rows[0];

  const isPasswordValid = await comparePassword(
    password,
    userData.password_hash,
  );

  return isPasswordValid ? { id: userData.id, name: userData.name } : undefined;
}
