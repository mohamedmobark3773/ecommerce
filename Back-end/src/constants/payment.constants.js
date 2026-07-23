//src/constants/payment.constants.js

export const PaymentStatuses = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED",
}

export const PaymentEventTriggers = {
    PAYMENT_CREATED: "PAYMENT_CREATED",
    PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
    PAYMENT_FAILED: "PAYMENT_FAILED",
    PAYMENT_REFUNDED: "PAYMENT_REFUNDED",
}

export const PaymentEventNames = {
    PAYMENT_CREATED: "PAYMENT_CREATED",
    PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
    PAYMENT_FAILED: "PAYMENT_FAILED",
    PAYMENT_REFUNDED: "PAYMENT_REFUNDED",
}

export const PaymentEventMessages = {
    PAYMENT_CREATED: "Payment created successfully.",
    PAYMENT_COMPLETED: "Payment completed successfully.",
    PAYMENT_FAILED: "Payment failed.",
    PAYMENT_REFUNDED: "Payment refunded successfully.",
}

