import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    CRYPTO_JS_SECRET: z.string(),

    OPENAI_API_KEY: z.string(),
    RESEND_API_KEY: z.string().optional(),

    DATABASE_URL: z.string().optional(),
    REDIS_URL: z.string().optional(),
    CONVEX_DEPLOYMENT: z.string().optional(),

    CLOUDFLARE_R2_BUCKET_NAME: z.string(),
    CLOUDFLARE_R2_ENDPOINT: z.string(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),

    WAYFORPAY_MERCHANT_LOGIN: z.string().optional(),
    WAYFORPAY_MERCHANT_SECRET_KEY: z.string().optional(),
    WAYFORPAY_MERCHANT_PASSWORD: z.string().optional(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string()
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production']).default('development'),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_CONVEX_URL: z.string().url(),
    NEXT_PUBLIC_MICROSOFT_CLARITY_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string()
  },
  runtimeEnv: {
    NODE_ENV: process.env['NODE_ENV'],
    CRYPTO_JS_SECRET: process.env['CRYPTO_JS_SECRET'],

    OPENAI_API_KEY: process.env['OPENAI_API_KEY'],
    RESEND_API_KEY: process.env['RESEND_API_KEY'],

    DATABASE_URL: process.env['DATABASE_URL'],
    REDIS_URL: process.env['REDIS_URL'],
    CONVEX_DEPLOYMENT: process.env['CONVEX_DEPLOYMENT'],

    CLOUDFLARE_R2_BUCKET_NAME: process.env['CLOUDFLARE_R2_BUCKET_NAME'],
    CLOUDFLARE_R2_ENDPOINT: process.env['CLOUDFLARE_R2_ENDPOINT'],
    CLOUDFLARE_R2_ACCESS_KEY_ID: process.env['CLOUDFLARE_R2_ACCESS_KEY_ID'],
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env['CLOUDFLARE_R2_SECRET_ACCESS_KEY'],

    WAYFORPAY_MERCHANT_LOGIN: process.env['WAYFORPAY_MERCHANT_LOGIN'],
    WAYFORPAY_MERCHANT_SECRET_KEY: process.env['WAYFORPAY_MERCHANT_SECRET_KEY'],
    WAYFORPAY_MERCHANT_PASSWORD: process.env['WAYFORPAY_MERCHANT_PASSWORD'],

    GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'],
    GOOGLE_CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'],

    NEXT_PUBLIC_NODE_ENV: process.env['NEXT_PUBLIC_NODE_ENV'],
    NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL'],
    NEXT_PUBLIC_CONVEX_URL: process.env['NEXT_PUBLIC_CONVEX_URL'],
    NEXT_PUBLIC_MICROSOFT_CLARITY_ID: process.env['NEXT_PUBLIC_MICROSOFT_CLARITY_ID'],

    GITHUB_CLIENT_ID: process.env['GITHUB_CLIENT_ID'],
    GITHUB_CLIENT_SECRET: process.env['GITHUB_CLIENT_SECRET'],

    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env['NEXT_PUBLIC_GOOGLE_CLIENT_ID']
  }
});
