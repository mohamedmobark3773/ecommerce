//src/errors/app.error.js

class ApiError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.stack = stack;
        this.name = 'ApiError';
    }
}

export { ApiError };