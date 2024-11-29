import 'server-only';
import { dbPool } from '../db';
import { comparePassword, hashPassword } from '@/lib/security/bcrypt';
import { UserModel } from './user.types';

export async function findUserSignIn(
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

export async function findUserExists(email: string): Promise<boolean> {
  const user = await dbPool.query(
    'SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)',
    [email],
  );

  return user.rows[0].exists;
}

export async function createUserReturning(
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

export async function findUserById(id: string): Promise<UserModel | undefined> {
  const user = await dbPool.query('SELECT id, name FROM users WHERE id = $1', [
    id,
  ]);

  return user.rows[0];
}
