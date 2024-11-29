import { hashPassword } from '@/lib/bcrypt/bcrypt';
import { signJwt } from '@/lib/jwt/jwt';
import { UserModel } from '@/models/user.model';
import { dbPool } from '@/services/db/db';
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
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.JWT_EXPIRES_IN),
    path: '/',
    sameSite: 'none',
  });

  return NextResponse.json(user);
}

async function findUserExists(email: string): Promise<boolean> {
  const user = await dbPool.query(
    'SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)',
    [email],
  );

  return user.rows[0].exists;
}

async function createUserReturning(
  email: string,
  username: string,
  password: string,
): Promise<UserModel> {
  const passwordHash = await hashPassword(password);

  const user = await dbPool.query(
    'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, name',
    [email, username, passwordHash],
  );

  return user.rows[0];
}
