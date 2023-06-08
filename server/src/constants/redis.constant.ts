export const RedisConstants = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
} as const;
