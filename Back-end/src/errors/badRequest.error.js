//src/errors/badRequest.error.js

class BadRequestError extends ApiError {
    constructor(message) {
        super(400, message);
    }
}

export default BadRequestError;