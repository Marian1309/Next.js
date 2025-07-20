import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import {
  admin,
  emailOTP,
  haveIBeenPwned,
  jwt,
  magicLink,
  oneTap,
  twoFactor,
  username
} from 'better-auth/plugins';

import { env } from '@/env';

import { sendEmail } from '@/actions/email';

import { ResetPasswordEmail, VerifyEmailEmail } from '@/components/emails';

import { database } from '@/database';
import * as schema from '@/database/auth-schema';

export const auth = betterAuth({
  account: {
    accountLinking: {
      enabled: true
    }
  },
  advanced: {
    useSecureCookies: env.NEXT_PUBLIC_NODE_ENV === 'production'
  },
  appName: 'Nextjs Sandbox',
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60 // 5 minutes
  },
  database: drizzleAdapter(database, {
    provider: 'pg',
    schema
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    maxPasswordLength: 32,
    minPasswordLength: 10,
    requireEmailVerification: true,
    sendOnSignUp: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: '🔐 BetterAuth ✨ Reset Password',
        type: 'react',
        content: ResetPasswordEmail({
          username: user.name ?? 'Anonymous',
          resetUrl: url,
          userEmail: user.email
        })
      });
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: '🔐 BetterAuth ✨ Email Verification',
        type: 'react',
        content: VerifyEmailEmail({
          username: user.name ?? 'Anonymous',
          verifyUrl: url
        })
      });
    }
  },
  plugins: [
    nextCookies(),
    jwt(),
    twoFactor(),
    username({
      minUsernameLength: 5,
      maxUsernameLength: 20
    }),
    admin(),
    oneTap({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    }),
    haveIBeenPwned({
      customPasswordCompromisedMessage: 'Please choose a more secure password.'
    }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: '🔐 BetterAuth ✨ Magic Link',
          type: 'html',
          content: `<a href="${url}">Click here to login</a>`
        });
      }
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await sendEmail({
          to: email,
          subject: '🔐 BetterAuth ✨ Email OTP',
          type: 'html',
          content: `<p>Your code is ${otp}</p>`
        });
      }
    })
  ],
  rateLimit: {
    enabled: env.NEXT_PUBLIC_NODE_ENV === 'production',
    max: 50,
    window: 60
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  user: {
    additionalFields: {
      role: {
        type: ['admin', 'user'],
        input: false
      }
    }
  }
});
