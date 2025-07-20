import type { Response } from './types';

export const response = <T>(params: Response<T>): Response<T> => ({
  message: params.message,
  data: params.data,
  success: params.success
});
