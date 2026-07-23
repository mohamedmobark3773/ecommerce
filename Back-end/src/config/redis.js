//src/config/redis.js
import { createClient } from "redis";


const redisClient = createClient({

    url: process.env.REDIS_URL
});

redisClient.on("connect", () => {

    console.log("Redis Connected");

});

redisClient.on("ready", () => {

    console.log("Redis Ready");

});

redisClient.on("error", (error) => {

    console.error("Redis Error:", error);

});

redisClient.on("end", () => {

    console.log("Redis Connection Closed");

});

export const connectRedis = async () => {

    try {

        if (!redisClient.isOpen) {

            await redisClient.connect();

        }

    } catch (error) {

        console.error("Failed to connect Redis:", error);

        process.exit(1);

    }

};


export default redisClient;