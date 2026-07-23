//src/errors/gatewayTimeout.error.js

class GatewayTimeoutError extends ApiError {
    constructor(message) {
        super(504, message);
    }
}

export { GatewayTimeoutError };

