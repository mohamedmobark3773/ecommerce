//src/errors/forbidden.error.js

class ForbiddenError extends ApiError {
    constructor(message) {
        super(403, message);
    }
}

export { ForbiddenError };

