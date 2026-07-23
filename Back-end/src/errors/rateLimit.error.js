//src/errors/rateLimit.error.js

class RateLimitError extends ApiError {
    constructor(message) {
        super(429, message);
    }
}

export { RateLimitError };

