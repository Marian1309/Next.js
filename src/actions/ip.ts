'use server';

import { headers } from 'next/headers';

export const getIPAddress = async () => {
  const header = await headers();

  return header.get('x-forwarded-for');
};
