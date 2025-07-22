'use client';

import { useCallback, useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { isFailure, tryCatch } from '@pidchashyi/try-catch';
import toast from 'react-hot-toast';

import { signOut } from '@/actions/auth';

import { Button } from '@/components/ui/button';

import { logger } from '@/helpers/logger';
import type { Session } from '@/types';

interface UserProfileProperties {
  name?: string;
  image?: string;
}

const UserProfile = ({ name, image }: UserProfileProperties) => {
  if (!name && !image) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {name && <div className="text-lg font-medium">{name}</div>}
      {image && (
        <Image
          src={image}
          alt={`${name || 'User'}'s avatar`}
          width={100}
          height={100}
          className="rounded-full transition-transform hover:scale-105 hover:cursor-pointer"
          priority
        />
      )}
    </div>
  );
};

interface Properties {
  session: Session;
}

const SignOut = ({ session }: Properties) => {
  const router = useRouter();

  const { name, image } = useMemo(
    () => ({
      name: session?.user?.name,
      image: session?.user?.image
    }),
    [session]
  );

  const handleSignOut = useCallback(async () => {
    const result = await tryCatch(
      toast.promise(signOut(), {
        loading: 'Signing out...',
        success: 'Signed out successfully',
        error: 'Failed to sign out'
      })
    );

    if (isFailure(result)) {
      logger.error('Sign out error:', result.error);
      toast.error('An unexpected error occurred');
      return;
    }

    router.push('/auth/sign-in');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <Button
        onClick={handleSignOut}
        className="bg-primary min-w-[120px] font-medium"
        variant="outline"
      >
        Sign out
      </Button>

      <UserProfile name={name} image={image || ''} />
    </div>
  );
};

export default SignOut;
