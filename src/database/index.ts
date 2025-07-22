import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env';

// import * as schema from './schema';
import * as authSchema from './auth-schema';

// Define connection pool configuration
const CONNECTION_CONFIG = {
  prepare: false,
  max: 20, // Increased pool size for better concurrency
  idle_timeout: 20, // Increased idle timeout (in seconds)
  max_lifetime: 60 * 30, // Connection lifetime in seconds (30 minutes)
  connect_timeout: 10 // Connection timeout in seconds
} as const;

let _db: ReturnType<typeof createDatabaseConnection> | null;

const createDatabaseConnection = () => {
  const queryClient = postgres(env.DATABASE_URL!, CONNECTION_CONFIG);

  return drizzle(queryClient, {
    schema: {
      ...authSchema
      // ...schema
    }
    // Add logger in development for query debugging
    // logger: env.NODE_ENV === 'development'
  });
};

// Singleton pattern to ensure single connection pool
const getDatabaseConnection = () => {
  if (!_db) {
    _db = createDatabaseConnection();
  }
  return _db;
};

export const database = getDatabaseConnection();
