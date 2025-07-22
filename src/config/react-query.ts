import type { QueryClientConfig, QueryKey } from '@tanstack/react-query';
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

/**
 * Optimized React Query configuration
 * Focused on performance, memory efficiency, and better caching
 */
const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes for better caching
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 2; // Max 2 retries for other errors
      },
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnMount: false, // Disable refetch on mount for cached data
      refetchOnReconnect: 'always', // Refetch when network reconnects
      gcTime: 10 * 60 * 1000, // Garbage collection time - 10 minutes
      // Reduce memory usage
      maxPages: 3 // Limit infinite query pages
    },
    mutations: {
      retry: 1, // Single retry for mutations
      networkMode: 'online', // Only execute when online
      // Reduce memory pressure
      gcTime: 5 * 60 * 1000 // 5 minutes for mutations
    }
  },
  mutationCache: new MutationCache({
    onSuccess: (_, __, ___, mutation) => {
      if (mutation?.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }
    },
    onError: (error: Error, __, ___, mutation) => {
      const errorMessage =
        mutation?.meta?.errorMessage || error?.message || 'An unexpected error occurred';

      toast.error(errorMessage);
    },
    onSettled: (_, __, ___, ____, mutation) => {
      if (mutation?.meta?.invalidatesQuery) {
        // Use a more targeted invalidation
        reactQueryClient.invalidateQueries({
          queryKey: mutation.meta.invalidatesQuery,
          exact: false,
          type: 'active' // Only invalidate active queries
        });
      }
    }
  })
};

// Create a singleton QueryClient instance with optimizations
export const reactQueryClient = new QueryClient(defaultQueryClientConfig);

// Cleanup function to reduce memory usage
export const cleanupQueryClient = () => {
  // Clear all queries older than 10 minutes
  reactQueryClient.getQueryCache().clear();
  // Clear mutation cache
  reactQueryClient.getMutationCache().clear();
};

// Auto-cleanup in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Cleanup every 15 minutes in development
  setInterval(cleanupQueryClient, 15 * 60 * 1000);
}
