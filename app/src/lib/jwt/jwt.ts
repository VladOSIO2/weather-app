import 'server-only';
import jwt, { JwtPayload } from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const verifyJwt = <T extends JwtPayload>(token: string): T => {
  return jwt.verify(token, JWT_SECRET as string) as T;
};

export const signJwt = (payload: string | object | Buffer) => {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
