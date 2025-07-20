import { useEffect, useRef } from 'react';

import { useIsMounted } from '@pidchashyi/hooks';

import { env } from '@/env';

import { logger } from '@/helpers/logger';

const loadClarity = () => import('@microsoft/clarity');

let clarityLoaded = false;

export const useClarity = () => {
  const isMounted = useIsMounted();
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current || clarityLoaded) {
      return;
    }

    if (
      !isMounted ||
      env.NEXT_PUBLIC_BASE_URL === 'http://localhost:3000' ||
      env.NEXT_PUBLIC_NODE_ENV !== 'production'
    ) {
      return;
    }

    initRef.current = true;

    const initClarity = async () => {
      try {
        const { default: Clarity } = await loadClarity();

        const initWithCallback = () => {
          try {
            Clarity.init(env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID);
            clarityLoaded = true;
          } catch (error) {
            logger.warn('Failed to initialize Microsoft Clarity:', error);
          }
        };

        if ('requestIdleCallback' in window) {
          requestIdleCallback(initWithCallback, { timeout: 2000 });
        } else {
          setTimeout(initWithCallback, 100);
        }
      } catch (error) {
        logger.warn('Failed to load Microsoft Clarity:', error);
        initRef.current = false;
      }
    };

    initClarity();
  }, [isMounted]);
};
