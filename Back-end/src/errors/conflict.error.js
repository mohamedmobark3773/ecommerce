//src/errors/conflict.error.js

class ConflictError extends ApiError {
    constructor(message) {
        super(409, message);
    }
}

export { ConflictError };