'use server';

import { redis } from '@/config/redis';

import { logger } from '@/helpers/logger';

const REDIS_TTL = 60 * 60; // 1 hour

export const setRedis = async (
  key: string,
  value: string | number | boolean | object,
  ttl?: number
) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttl ?? REDIS_TTL);
};

export const getRedis = async (key: string) => {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : undefined;
};

export const deleteRedis = async (key: string) => {
  await redis.del(key);
};

export const deleteKeysWithPrefix = async (prefix: string) => {
  const keys = await redis.keys(`${prefix}*`);

  if (keys.length === 0) {
    logger.info(`No keys found with prefix ${prefix}`);
    return;
  }

  await redis.del(keys);
};

export const deleteAllRedis = async () => {
  await redis.flushall();
};
