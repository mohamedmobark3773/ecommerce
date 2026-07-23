import redisClient from "../config/redis.js";

export const setWithExpiry = async (
    key,
    value,
    ttlInSeconds
) => {

    await redisClient.set(
        key,
        value,
        {
            EX: ttlInSeconds,
        }
    );

};

export const get = async (key) => {

    return await redisClient.get(key);

};

export const del = async (key) => {

    return await redisClient.del(key);

};

export const getAllKeys = async (pattern = "*") => {

    const keys = [];

    for await (const key of redisClient.scanIterator({
        MATCH: pattern,
    })) {

        keys.push(key);

    }

    return keys;

};

export default {

    client: redisClient,

    setWithExpiry,

    get,

    del,

    getAllKeys,

};