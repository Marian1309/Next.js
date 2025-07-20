import { defineConfig } from 'drizzle-kit';

const drizzleConfig = defineConfig({
  out: './src/database/migrations',
  schema: ['./src/database/auth-schema.ts', './src/database/schema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  }
});

export default drizzleConfig;
