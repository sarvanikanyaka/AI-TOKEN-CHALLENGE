// Minimal Redis-backed token store wrapper

import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new IORedis(redisUrl);

export async function storeRefreshJti(jti: string, userId: string, ttlSeconds: number) {
  // store key -> userId with TTL
  await redis.set(`refresh:${jti}`, userId, 'EX', ttlSeconds);
}

export async function getRefreshJtiOwner(jti: string) {
  return await redis.get(`refresh:${jti}`);
}

export async function revokeRefreshJti(jti: string) {
  return await redis.del(`refresh:${jti}`);
}

export async function close() {
  await redis.quit();
}

// Note: In production wrap redis calls with retries and monitoring. Do not store secrets here.