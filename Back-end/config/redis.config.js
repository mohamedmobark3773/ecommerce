//config/redis.config.js


import { createClient } from "redis";

import config from "./config.js";

import logger from "../utils/logger.util.js";

const redisClient = createClient({

    url: config.redisUrl

});


redisClient.on("connect", () => {

    logger.redis("Connecting to Redis...");

});

redisClient.on("ready", () => {

    logger.success("Redis connected successfully.");

});

redisClient.on("error", (error) => {

    logger.error(`Redis Error: ${error.message}`);

});

redisClient.on("end", () => {

    logger.warn("Redis connection closed.");

});

export const connectRedis = async () => {

    if (redisClient.isOpen) {
        return redisClient;
    }

    await redisClient.connect();

    return redisClient;

};

export default redisClient;