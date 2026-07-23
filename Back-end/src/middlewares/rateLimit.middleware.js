// src/middlewares/rateLimit.middleware.js

import RedisClient from "../config/redis.config.js";

import ApiError from "../utils/apiError.util.js";
import Constants from "../utils/constant.util.js";
import asyncHandler from "./asyncHandler.middleware.js";

export const rateLimiter = (limit = 100, windowMs = 60000) => {

    return asyncHandler(async (req, res, next) => {

        const clientIp = req.ip;

        const key = `rate:${clientIp}`;

        const requests = await RedisClient.incr(key);

        if (requests === 1) {
            await RedisClient.expire(key, Math.ceil(windowMs / 1000));
        }

        const ttl = await RedisClient.ttl(key);

        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
            "X-RateLimit-Remaining",
            Math.max(limit - requests, 0)
        );

        if (requests > limit) {

            res.setHeader("Retry-After", ttl);

            throw new ApiError(
                Constants.StatusCodes.TOO_MANY_REQUESTS,
                `Too many requests. Try again after ${ttl} seconds.`
            );

        }

        next();

    });

};