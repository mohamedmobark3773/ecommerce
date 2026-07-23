//src/controllers/apiKey.controller.js
import { ApiKey } from "../models/apiKey.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createApiKey = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const {
        name,
        description,
        permissions,
        expiresAt,
    } = req.body;


    if (!name || !description || !permissions || !expiresAt) {
        throw new ApiError(400, "All required fields are required.");
    }

    const apiKey = await ApiKey.create({
        user: userId,
        name,
        description,
        permissions,
        expiresAt,
    });


    const response = {
        success: true,
        message: "API key created successfully.",
        data: apiKey,
    };

    return res.status(201).json(response);

});

export const getApiKeys = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const apiKeys = await ApiKey.find({
        user: userId,
    });


    const response = {
        success: true,
        message: "API keys retrieved successfully.",
        data: apiKeys,
    };

    return res.status(200).json(response);

});

export const getApiKey = asyncHandler(async (req, res) => {

    const apiKey = req.apiKey;

    const response = {
        success: true,
        message: "API key retrieved successfully.",
        data: apiKey,
    };

    return res.status(200).json(response);

});

export const updateApiKey = asyncHandler(async (req, res) => {

    const apiKey = req.apiKey;

    const {
        name,
        description,
        permissions,
        expiresAt,
    } = req.body;


    apiKey.name = name || apiKey.name;
    apiKey.description = description || apiKey.description;
    apiKey.permissions = permissions || apiKey.permissions;
    apiKey.expiresAt = expiresAt || apiKey.expiresAt;


    await apiKey.save();


    const response = {
        success: true,
        message: "API key updated successfully.",
        data: apiKey,
    };

    return res.status(200).json(response);

});

export const deleteApiKey = asyncHandler(async (req, res) => {

    const apiKey = req.apiKey;

    await apiKey.remove();


    const response = {
        success: true,
        message: "API key deleted successfully.",
    };

    return res.status(200).json(response);

});

export const revokeApiKey = asyncHandler(async (req, res) => {

    const apiKey = req.apiKey;

    apiKey.status = "REVOKED";


    await apiKey.save();


    const response = {
        success: true,
        message: "API key revoked successfully.",
    };

    return res.status(200).json(response);

});

export const generateApiKey = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const {
        name,
        description,
        permissions,
        expiresAt,
    } = req.body;


    if (!name || !description || !permissions || !expiresAt) {
        throw new ApiError(400, "All required fields are required.");
    }

    const apiKey = await ApiKey.create({
        user: userId,
        name,
        description,
        permissions,
        expiresAt,
    });


    const response = {
        success: true,
        message: "API key generated successfully.",
        data: apiKey,
    };

    return res.status(201).json(response);

});
