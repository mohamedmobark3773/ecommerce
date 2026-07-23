// src/middlewares/maintenance.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";

import config from "../config/config.js";

const maintenanceMiddleware = asyncHandler(async (req, res, next) => {

    // التحقق من وضع الصيانة
    if (config.isMaintenanceMode) {

        return res.status(503).json({

            success: false,

            statusCode: 503,

            message: "The server is currently under maintenance. Please try again later."

        });

    }

    next();

});

export default maintenanceMiddleware;