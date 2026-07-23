//src/errors/unauthorized.error.js

class UnauthorizedError extends ApiError {
    constructor(message) {
        super(401, message);
    }
}

export { UnauthorizedError };

