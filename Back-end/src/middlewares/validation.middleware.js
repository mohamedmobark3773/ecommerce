//src/middlewares/validation.middleware.js

import joi from "joi";
import asyncHandler from "./asyncHandler.middleware.js";
import ApiError from "../utils/apiError.util.js";
import Constants from "../utils/constant.util.js";

export const validateBody = (schema) => {
    return asyncHandler(async (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        });

        if (error) {
            throw new ApiError(
                Constants.StatusCodes.BAD_REQUEST,
                error.details[0].message
            );
        }
        next();
    });
};

export const validateQuery = (schema) => {
    return asyncHandler(async (req, res, next) => {
        const { error } = schema.validate(req.query, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        });

        if (error) {
            throw new ApiError(
                Constants.StatusCodes.BAD_REQUEST,
                error.details[0].message
            );
        }
        next();
    });
};

export const validateParams = (schema) => {
    return asyncHandler(async (req, res, next) => {
        const { error } = schema.validate(req.params, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        });

        if (error) {
            throw new ApiError(
                Constants.StatusCodes.BAD_REQUEST,
                error.details[0].message
            );
        }
        next();
    });
};
