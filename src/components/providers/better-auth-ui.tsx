'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import toast from 'react-hot-toast';

import { authClient } from '@/config/better-auth-client';

interface Properties {
  children: ReactNode;
}

const BetterAuthUI = ({ children }: Properties) => {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      Link={Link}
      onSessionChange={() => router.refresh()}
      organization
      nameRequired
      emailOTP
      optimistic
      changeEmail
      emailVerification
      magicLink
      twoFactor={['otp']}
      social={{
        providers: ['github', 'google']
      }}
      localization={{
        EMAIL_PLACEHOLDER: 'Enter your email',
        PASSWORD_PLACEHOLDER: 'Enter your password',
        NAME_PLACEHOLDER: 'Enter your name',
        USERNAME_PLACEHOLDER: 'Enter your username'
      }}
      toast={({ variant, message }) => {
        switch (variant) {
          case 'error': {
            return toast.error(message ?? 'An error occurred');
          }
          case 'success': {
            return toast.success(message ?? 'Success');
          }
          case 'warning': {
            return toast.custom(() => (
              <div className="rounded-md bg-yellow-500 p-4 text-white">
                {message ?? 'Warning'}
              </div>
            ));
          }
          case 'info': {
            return toast.custom(() => (
              <div className="rounded-md bg-blue-500 p-4 text-white">
                {message ?? 'Info'}
              </div>
            ));
          }
          case 'default': {
            return toast.custom(() => (
              <div className="rounded-md bg-gray-500 p-4 text-white">
                {message ?? 'Default'}
              </div>
            ));
          }
          default: {
            return toast.custom(() => (
              <div className="rounded-md bg-gray-500 p-4 text-white">
                {message ?? 'Default'}
              </div>
            ));
          }
        }
      }}
    >
      {children}
    </AuthUIProvider>
  );
};

export default BetterAuthUI;
