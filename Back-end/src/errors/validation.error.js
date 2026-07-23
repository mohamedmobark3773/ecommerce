//src/errors/validation.error.js

class ValidationError extends ApiError {
    constructor(message) {
        super(400, message);
    }
}


