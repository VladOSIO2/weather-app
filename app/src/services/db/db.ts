import 'server-only';
import { Pool } from 'pg';

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: true }
      : undefined,
});
