//src/constants/order.constants.js

export const OrderStatuses = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
    REFUNDED: "REFUNDED",
}

export const OrderEvents = {
    ORDER_CREATED: "ORDER_CREATED",
    ORDER_UPDATED: "ORDER_UPDATED",
    ORDER_DELETED: "ORDER_DELETED",
    ORDER_CANCELLED: "ORDER_CANCELLED",
    ORDER_RETURNED: "ORDER_RETURNED",
    ORDER_REFUNDED: "ORDER_REFUNDED",
}

export const OrderEventTriggers = {
    ORDER_CREATED: "ORDER_CREATED",
    ORDER_UPDATED: "ORDER_UPDATED",
    ORDER_DELETED: "ORDER_DELETED",
    ORDER_CANCELLED: "ORDER_CANCELLED",
    ORDER_RETURNED: "ORDER_RETURNED",
    ORDER_REFUNDED: "ORDER_REFUNDED",
}

export const OrderEventNames = {
    ORDER_CREATED: "ORDER_CREATED",
    ORDER_UPDATED: "ORDER_UPDATED",
    ORDER_DELETED: "ORDER_DELETED",
    ORDER_CANCELLED: "ORDER_CANCELLED",
    ORDER_RETURNED: "ORDER_RETURNED",
    ORDER_REFUNDED: "ORDER_REFUNDED",
}


export const OrderEventMessages = {
    ORDER_CREATED: "Order created successfully.",
    ORDER_UPDATED: "Order updated successfully.",
    ORDER_DELETED: "Order deleted successfully.",
    ORDER_CANCELLED: "Order cancelled successfully.",
    ORDER_RETURNED: "Order returned successfully.",
    ORDER_REFUNDED: "Order refunded successfully.",
}
