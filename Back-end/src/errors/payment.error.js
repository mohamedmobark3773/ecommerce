//src/errors/payment.error.js

class PaymentError extends ApiError {
    constructor(message) {
        super(402, message);
    }
}

export { PaymentError };

