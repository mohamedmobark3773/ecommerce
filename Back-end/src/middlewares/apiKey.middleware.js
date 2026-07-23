import crypto from "crypto";

import { ApiKey } from "../models/apiKey.model.js";

import asyncHandler from "../utils/async-handler.util.js";
import ApiError from "../utils/api-error.util.js";

const validateApiKeyData = async (apiKey) => {

    if (!apiKey) {
        throw new ApiError(401, "API Key is required.");
    }

    const parts = apiKey.split(".");

    if (parts.length !== 2) {
        throw new ApiError(401, "Invalid API Key format.");
    }

    const [keyId, rawSecret] = parts;

    const apiKeyDoc = await ApiKey.findById(keyId);

    if (!apiKeyDoc) {
        throw new ApiError(401, "Invalid API Key.");
    }

    const hashedSecret = crypto
        .createHash("sha256")
        .update(rawSecret)
        .digest("hex");

    if (hashedSecret !== apiKeyDoc.keyHash) {
        throw new ApiError(401, "Invalid API Key.");
    }

    apiKeyDoc.lastUsedAt = new Date();

    await apiKeyDoc.save();

    return apiKeyDoc;

};

export const extractApiKey = asyncHandler(async (req, res, next) => {

    const apiKey = req.headers["x-api-key"]?.trim();

    if (!apiKey) {
        throw new ApiError(401, "API Key is required.");
    }

    req.rawApiKey = apiKey;

    next();

});

export const validateApiKey = asyncHandler(async (req, res, next) => {

    const apiKey = await validateApiKeyData(req.rawApiKey);

    req.apiKey = apiKey;

    next();

});

export const checkApiKeyStatus = asyncHandler(async (req, res, next) => {

    if (!req.apiKey.isActive) {
        throw new ApiError(403, "API Key is inactive.");
    }

    if (req.apiKey.isDeleted) {
        throw new ApiError(403, "API Key has been deleted.");
    }

    if (
        req.apiKey.expiresAt &&
        req.apiKey.expiresAt < new Date()
    ) {
        throw new ApiError(403, "API Key has expired.");
    }

    next();

});

export const checkApiKeyPermissions = (requiredPermissions = []) => {

    return asyncHandler(async (req, res, next) => {

        if (
            requiredPermissions.length &&
            !requiredPermissions.every(permission =>
                req.apiKey.permissions.includes(permission)
            )
        ) {

            throw new ApiError(
                403,
                "Insufficient API Key permissions."
            );

        }

        next();

    });

};

export const attachApiKeyToRequest = asyncHandler(async (req, res, next) => {

    req.apiKeyId = req.apiKey._id;

    req.apiKeyName = req.apiKey.name;

    req.apiKeyPermissions = req.apiKey.permissions;

    next();

});

export const apiKeyMiddleware = [

    extractApiKey,

    validateApiKey,

    checkApiKeyStatus,

];