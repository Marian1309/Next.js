'use client';

import { useCallback } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { signOut } from '@/actions/auth';

import { Button } from '@/components/ui/button';

import type { Session } from '@/types';

interface Properties {
  session: Session;
}

const SignOut = ({ session }: Properties) => {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await toast.promise(signOut(), {
      loading: 'Signing out...',
      success: 'Signed out successfully',
      error: 'Failed to sign out'
    });

    router.push('/auth/sign-in');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Button onClick={handleSignOut}>Sign out</Button>
      {session?.user?.name && <div>{session.user.name}</div>}

      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt={`${session.user.name}'s avatar`}
          width={100}
          height={100}
          className="rounded-full"
          priority
        />
      )}
    </div>
  );
};

export default SignOut;
