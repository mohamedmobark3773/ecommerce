//src/middlewares/security.middleware.js

// src/middlewares/security.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";

const securityMiddleware = asyncHandler(async (req, res, next) => {

    res.setHeader("X-Frame-Options", "DENY");

    res.setHeader("X-Content-Type-Options", "nosniff");

    res.setHeader("X-XSS-Protection", "1; mode=block");

    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    res.setHeader(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()"
    );

    res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload"
    );

    res.setHeader(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "object-src 'none'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ].join("; ")
    );

    res.removeHeader("X-Powered-By");

    next();

});

export default securityMiddleware;