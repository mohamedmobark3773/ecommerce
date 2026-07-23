// src/middlewares/cors.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";
import cors from "cors"
import config from "../config/config.js";
import ApiError from "../utils/apiError.util.js";

const corsMiddleware = asyncHandler(async (req, res, next) => {

    const origin = req.headers.origin || "";

    const allowedOrigins = config.allowedOrigins
        .split(",")
        .map(origin => origin.trim());

    
    if (origin && !allowedOrigins.includes(origin)) {
        throw new ApiError(403, "Origin is not allowed.");
    }

    
    if (origin) {

        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");

    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();

});

export default corsMiddleware;