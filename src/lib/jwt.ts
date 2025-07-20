import { isFailure, tryCatch } from '@pidchashyi/try-catch';
import type { JWTPayload } from 'jose';
import { SignJWT, jwtVerify } from 'jose';

import { env } from '@/env';

const encoder = new TextEncoder();

type JwtResult<T = JWTPayload> = Promise<T>;

export const signJwt = async <T extends JWTPayload>(
  payload: T,
  expiresIn = '24h'
): JwtResult<string> => {
  if (!payload) {
    throw new Error('Missing required parameters');
  }

  const result = await tryCatch(
    new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiresIn)
      .sign(encoder.encode(env.CRYPTO_JS_SECRET))
  );

  if (isFailure(result)) {
    throw result.error;
  }

  return result.data;
};

export const verifyJwt = async <T extends JWTPayload = JWTPayload>(
  token: string
): JwtResult<T> => {
  if (!token) {
    throw new Error('Missing required parameters');
  }

  const result = await tryCatch(jwtVerify(token, encoder.encode(env.CRYPTO_JS_SECRET)));

  if (isFailure(result)) {
    throw result.error;
  }

  return result.data.payload as T;
};
