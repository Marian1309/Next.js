import type { auth } from './lib/auth';

export interface Response<T> {
  message: string;
  data: T;
  success: boolean;
}

export type Session = typeof auth.$Infer.Session | null;
export type ErrorCode = (typeof auth.$ERROR_CODES)[keyof typeof auth.$ERROR_CODES];
