//src/errors/database.error.js

class DatabaseError extends ApiError {
    constructor(message) {
        super(500, message);
    }
}

export { DatabaseError };

