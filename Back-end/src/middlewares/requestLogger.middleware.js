// src/middlewares/requestLogger.middleware.js

import logger from "../utils/logger.util.js";

const requestLoggerMiddleware = (req, res, next) => {

    // وقت بداية الطلب
    const startTime = Date.now();

    // تسجيل بداية الطلب
    logger.http(
        `Incoming Request | ${req.method} ${req.originalUrl} | IP: ${req.ip}`
    );

    // تسجيل بعد انتهاء الاستجابة
    res.on("finish", () => {

        const duration = Date.now() - startTime;

        logger.http(
            `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms | IP: ${req.ip} | User-Agent: ${req.headers["user-agent"] || "Unknown"}`
        );

    });

    next();

};

export default requestLoggerMiddleware;