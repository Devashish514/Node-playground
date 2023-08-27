import { serialize } from "v8";
import redis_client from "../db/redis.index";
import { Request, Response, NextFunction } from "express";

export const redisMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // set key in cache with expiration time of 1 min
        const setKey = await redis_client.SETEX("greeting", 60 * 60, "Hello, Good Morning.");
        console.log("REDIS:SETEX", setKey);

        // get key from cache..
        const getKey = await redis_client.get("greeting");
        console.log("REDIS:GET", getKey);

        //get TTL (Time to live value,  for specific key);
        const timeLeftToExp = await redis_client.TTL("greeting");
        console.log("REDIS:TTL", timeLeftToExp);

        // Increment EXPIRE time for "greeting" key...
        const incrementExpirationTime = timeLeftToExp + 60 * 60;  //
        await redis_client.EXPIRE("greeting", incrementExpirationTime);

        const timeLeftToExp2 = await redis_client.TTL("greeting");
        console.log("REDIS: Increment TTL", timeLeftToExp2, '\n');

        next();

    } catch (error) {
        console.error(error);
    }
}