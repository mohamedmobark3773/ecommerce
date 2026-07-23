// src/middlewares/error.middleware.js

import ApiError from "../utils/apiError.util.js";
import Constants from "../utils/constant.util.js";
import logger from "../utils/logger.util.js";
import config from "../config/config.js";

export const errorHandler = (err, req, res, next) => {

    let error = err;

    // Duplicate Key Error
    if (err.code === 11000) {

        error = new ApiError(
            Constants.StatusCodes.BAD_REQUEST,
            "Duplicate key error."
        );

    }

    // Invalid Mongo ObjectId
    if (err.name === "CastError") {

        error = new ApiError(
            Constants.StatusCodes.BAD_REQUEST,
            "Invalid resource id."
        );

    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {

        error = new ApiError(
            Constants.StatusCodes.BAD_REQUEST,
            Object.values(err.errors)
                .map(item => item.message)
                .join(", ")
        );

    }

    // JWT Error
    if (err.name === "JsonWebTokenError") {

        error = new ApiError(
            Constants.StatusCodes.UNAUTHORIZED,
            "Invalid token."
        );

    }

    // JWT Expired
    if (err.name === "TokenExpiredError") {

        error = new ApiError(
            Constants.StatusCodes.UNAUTHORIZED,
            "Token expired."
        );

    }

    const statusCode =
        error.statusCode ||
        error.status ||
        Constants.StatusCodes.INTERNAL_SERVER_ERROR;

    const message =
        error.message ||
        "Something went wrong.";

    if (statusCode >= 500) {
        logger.error(error.stack);
    } else if (statusCode === 404) {
        logger.warn(`404: ${req.method} ${req.originalUrl}`);
    }

    res.status(statusCode).json({

        success: false,

        statusCode,

        message,

        ...(config.nodeEnv === "development" && {
            stack: error.stack
        })

    });

};