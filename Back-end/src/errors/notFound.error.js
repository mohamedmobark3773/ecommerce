//src/errors/notFound.error.js

class NotFoundError extends ApiError {
    constructor(message) {
        super(404, message);
    }
}

export { NotFoundError };

