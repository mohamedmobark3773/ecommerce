// src/middlewares/deviceInfo.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";

const deviceInfoMiddleware = asyncHandler(async (req, res, next) => {

    const deviceInfo = {

        deviceType: req.deviceType || null,

        browser: req.browser || null,

        os: req.os || null,

        device: req.device || null,

        userAgent: req.headers["user-agent"] || "",

        ip: req.ip,

        location: req.location || null

    };

    req.deviceInfo = deviceInfo;

    next();

});

export default deviceInfoMiddleware;