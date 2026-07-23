//src/errors/internalServer.error.js

class InternalServerError extends ApiError {
    constructor(message) {
        super(500, message);
    }
}

export { InternalServerError };

