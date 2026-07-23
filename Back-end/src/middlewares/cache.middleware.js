//src/middlewares/cache.middleware.js
 
import RedisClient from "../config/redis.config.js";
import Constants from "../utils/constant.util.js";
import ApiError from "../utils/apiError.util.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js"
import Helpers from "../utils/helper.util.js";
import logger from "../utils/logger.util.js";


const getCachedResponse = asyncHandler(async(req,res,next) => {
    const cacheKey = Helpers.generateCacheKey(req)
    const cachedData = await RedisClient.get(cacheKey)
    if(cachedData) {
        const parsedData = JSON.parse(cachedData)
        logger.success("Cache hit for", cacheKey)
        return res.status(Constants.StatusCodes.OK).json({
            success: true,
            message: "Data fetched successfully",
            data: parsedData,
            isCached: true
        })
    }
    next()
}) 

export const checkCache = async(req,res,next) => {
    const cacheKey = Helpers.generateCacheKey(req)
    const cachedData = await RedisClient.get(cacheKey)
    if(cachedData) {
        const parsedData = JSON.parse(cachedData)
        logger.success("Cache hit for", cacheKey)
        return res.status(Constants.StatusCodes.OK).json({
            success: true,
            message: "Data fetched successfully",
            data: parsedData,
            isCached: true
        })
    }
    next()
}

export const attachCache = asyncHandler(async(req,res,next) => {
        const keys = cacheKeys
            .map((key) => typeof key === "function" ? key(req) : key)
            .filter(Boolean);

        if (keys.length > 0) {
            await RedisClient.del(keys);
        }

        next();
});

export const invalidateCache = (...cacheKeys) => {

    return asyncHandler(async (req, res, next) => {

        
        const keys = cacheKeys
            .map((key) => typeof key === "function" ? key(req) : key)
            .filter(Boolean);

        if (keys.length) {
            await redisClient.del(keys);
        }

        next();

    });

};