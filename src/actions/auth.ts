'use server';

import { headers } from 'next/headers';

import { isFailure, tryCatch } from '@pidchashyi/try-catch';

import { auth } from '@/lib/auth';

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return session;
};

export const signUpByEmail = async (params: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = await tryCatch(
    auth.api.signUpEmail({
      body: {
        name: params.name,
        email: params.email,
        password: params.password
      }
    })
  );

  if (isFailure(user)) {
    return {
      success: false,
      message: user.error?.message ?? 'Something went wrong'
    };
  }

  return {
    success: true,
    message: 'User signed up successfully'
  };
};

export const signInByEmail = async (params: { email: string; password: string }) => {
  const user = await tryCatch(
    auth.api.signInEmail({
      body: {
        email: params.email,
        password: params.password
      }
    })
  );

  if (isFailure(user)) {
    return {
      success: false,
      message: user.error?.message ?? 'Something went wrong'
    };
  }

  return {
    success: true,
    message: 'Signed in successfully.'
  };
};

export const signOut = async () => {
  const result = await tryCatch(
    auth.api.signOut({
      headers: await headers()
    })
  );

  if (isFailure(result)) {
    return {
      success: false,
      message: result.error?.message ?? 'Something went wrong'
    };
  }

  return {
    success: true,
    message: 'Signed out successfully'
  };
};
