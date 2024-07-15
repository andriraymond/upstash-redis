import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: "UPSTASH_REDIS_REST_URL",
    token: "UPSTASH_REDIS_REST_TOKEN",
})

const data = await redis.set("foo", "bar");
