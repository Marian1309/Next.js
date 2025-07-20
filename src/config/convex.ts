import { ConvexReactClient } from 'convex/react';

import { env } from '@/env';

export const convexClient = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);
