import { Redis } from "@upstash/redis";

function getRedis(): Redis {

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Redis credentials missing.");
  }

  return new Redis({ url, token });
}

export const redis = getRedis();
