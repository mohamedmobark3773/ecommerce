//src/errors/serviceUnavailable.error.js

class ServiceUnavailableError extends ApiError {
    constructor(message) {
        super(503, message);
    }
}

export { ServiceUnavailableError };

