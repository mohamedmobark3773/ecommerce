//src/constants/error.constants.js

export const AuthenticationErrors = {
    INVALID_CREDENTIALS: "Invalid email or password.",
    UNAUTHORIZED: "Unauthorized.",
    FORBIDDEN: "Access denied.",
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
}

export const UserErrors = {
    USER_NOT_FOUND: "User not found.",
    USER_ALREADY_EXISTS: "User already exists.",
    USER_DELETED: "User deleted successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_CREATED: "User created successfully.",
    USER_NOT_FOUND: "User not found.",
    USER_NOT_FOUND: "User not found.",
}

export const ProductErrors = {
    PRODUCT_NOT_FOUND: "Product not found.",
    PRODUCT_ALREADY_EXISTS: "Product already exists.",
    PRODUCT_DELETED: "Product deleted successfully.",
    PRODUCT_UPDATED: "Product updated successfully.",
    PRODUCT_CREATED: "Product created successfully.",
    PRODUCT_NOT_FOUND: "Product not found.",
    PRODUCT_NOT_FOUND: "Product not found.",
}

export const OrderErrors = {
    ORDER_NOT_FOUND: "Order not found.",
    ORDER_ALREADY_EXISTS: "Order already exists.",
    ORDER_DELETED: "Order deleted successfully.",
    ORDER_UPDATED: "Order updated successfully.",
    ORDER_CREATED: "Order created successfully.",
    ORDER_NOT_FOUND: "Order not found.",
    ORDER_NOT_FOUND: "Order not found.",
}

export const CartErrors = {
    CART_NOT_FOUND: "Cart not found.",
    CART_ALREADY_EXISTS: "Cart already exists.",
    CART_DELETED: "Cart deleted successfully.",
    CART_UPDATED: "Cart updated successfully.",
    CART_CREATED: "Cart created successfully.",
    CART_NOT_FOUND: "Cart not found.",
    CART_NOT_FOUND: "Cart not found.",
}

export const CatagoryErrors = {
    CATAGORY_NOT_FOUND: "Catagory not found.",
    CATAGORY_ALREADY_EXISTS: "Catagory already exists.",
    CATAGORY_DELETED: "Catagory deleted successfully.",
    CATAGORY_UPDATED: "Catagory updated successfully.",
    CATAGORY_CREATED: "Catagory created successfully.",
    CATAGORY_NOT_FOUND: "Catagory not found.",
    CATAGORY_NOT_FOUND: "Catagory not found.",
}

export const CouponErrors = {
    COUPON_NOT_FOUND: "Coupon not found.",
    COUPON_ALREADY_EXISTS: "Coupon already exists.",
    COUPON_DELETED: "Coupon deleted successfully.",
    COUPON_UPDATED: "Coupon updated successfully.",
    COUPON_CREATED: "Coupon created successfully.",
    COUPON_NOT_FOUND: "Coupon not found.",
    COUPON_NOT_FOUND: "Coupon not found.",
}

export const validationErrors = {
    VALIDATION_ERROR: "Validation error.",
    INVALID_INPUT: "Invalid input.",
    MISSING_REQUIRED_FIELDS: "Missing required fields.",
    INVALID_DATA_TYPE: "Invalid data type.",
    INVALID_RANGE: "Invalid range.",
    INVALID_FORMAT: "Invalid format.",
    INVALID_LENGTH: "Invalid length.",
}

export const dataBaseErrors ={

    //MONGOOSE ERRORS
    MONGO_DB_ERROR: "MongoDB error.",
    MONGOOSE_DUPLICATE_ERROR: "Duplicate key error.",
    MONGOOSE_VALIDATION_ERROR: "Validation error.",
    MONGOOSE_CAST_ERROR: "Cast error.",
    MONGOOSE_CONNECTION_ERROR: "Connection error.",
    MONGOOSE_DISCONNECTED_ERROR: "Disconnected error.",
    MONGOOSE_RECONNECTING_ERROR: "Reconnecting error.",
    MONGOOSE_TIMEOUT_ERROR: "Timeout error.",
    MONGOOSE_NETWORK_ERROR: "Network error.",
    MONGOOSE_DRIVER_ERROR: "Driver error.",
    MONGOOSE_QUERY_ERROR: "Query error.",
    MONGOOSE_MODEL_ERROR: "Model error.",
    MONGOOSE_DOCUMENT_ERROR: "Document error.",
    MONGOOSE_SCHEMA_ERROR: "Schema error.",
    MONGOOSE_CONNECTION_TIMEOUT_ERROR: "Connection timeout error.",
    MONGOOSE_NETWORK_TIMEOUT_ERROR: "Network timeout error.",
    MONGOOSE_DRIVER_TIMEOUT_ERROR: "Driver timeout error.",
    MONGOOSE_QUERY_TIMEOUT_ERROR: "Query timeout error.",
    MONGOOSE_MODEL_TIMEOUT_ERROR: "Model timeout error.",
    MONGOOSE_DOCUMENT_TIMEOUT_ERROR: "Document timeout error.",
    MONGOOSE_SCHEMA_TIMEOUT_ERROR: "Schema timeout error.",
    MONGOOSE_CONNECTION_RETRY_ERROR: "Connection retry error.",
    MONGOOSE_NETWORK_RETRY_ERROR: "Network retry error.",
    MONGOOSE_DRIVER_RETRY_ERROR: "Driver retry error.",
    MONGOOSE_QUERY_RETRY_ERROR: "Query retry error.",
    MONGOOSE_MODEL_RETRY_ERROR: "Model retry error.",
    MONGOOSE_DOCUMENT_RETRY_ERROR: "Document retry error.",
    MONGOOSE_SCHEMA_RETRY_ERROR: "Schema retry error.",
    MONGOOSE_CONNECTION_RETRY_TIMEOUT_ERROR: "Connection retry timeout error.",
    MONGOOSE_NETWORK_RETRY_TIMEOUT_ERROR: "Network retry timeout error.",
    MONGOOSE_DRIVER_RETRY_TIMEOUT_ERROR: "Driver retry timeout error.",
    MONGOOSE_QUERY_RETRY_TIMEOUT_ERROR: "Query retry timeout error.",
    MONGOOSE_MODEL_RETRY_TIMEOUT_ERROR: "Model retry timeout error.",
    MONGOOSE_DOCUMENT_RETRY_TIMEOUT_ERROR: "Document retry timeout error.",
    MONGOOSE_SCHEMA_RETRY_TIMEOUT_ERROR: "Schema retry timeout error.",
    MONGOOSE_CONNECTION_RETRY_RECONNECT_ERROR: "Connection retry reconnect error.",
    MONGOOSE_NETWORK_RETRY_RECONNECT_ERROR: "Network retry reconnect error.",
    MONGOOSE_DRIVER_RETRY_RECONNECT_ERROR: "Driver retry reconnect error.",
    MONGOOSE_QUERY_RETRY_RECONNECT_ERROR: "Query retry reconnect error.",
    MONGOOSE_MODEL_RETRY_RECONNECT_ERROR: "Model retry reconnect error.",
    MONGOOSE_DOCUMENT_RETRY_RECONNECT_ERROR: "Document retry reconnect error.",
    MONGOOSE_SCHEMA_RETRY_RECONNECT_ERROR: "Schema retry reconnect error.",
    MONGOOSE_CONNECTION_RETRY_RECONNECT_TIMEOUT_ERROR: "Connection retry reconnect timeout error.",
    MONGOOSE_NETWORK_RETRY_RECONNECT_TIMEOUT_ERROR: "Network retry reconnect timeout error.",
    MONGOOSE_DRIVER_RETRY_RECONNECT_TIMEOUT_ERROR: "Driver retry reconnect timeout error.",
    MONGOOSE_QUERY_RETRY_RECONNECT_TIMEOUT_ERROR: "Query retry reconnect timeout error.",
    MONGOOSE_MODEL_RETRY_RECONNECT_TIMEOUT_ERROR: "Model retry reconnect timeout error.",
    MONGOOSE_DOCUMENT_RETRY_RECONNECT_TIMEOUT_ERROR: "Document retry reconnect timeout error.",
    MONGOOSE_SCHEMA_RETRY_RECONNECT_TIMEOUT_ERROR: "Schema retry reconnect timeout error.",
    MONGOOSE_CONNECTION_RETRY_RECONNECT_RETRY_ERROR: "Connection retry reconnect retry error.",
    MONGOOSE_NETWORK_RETRY_RECONNECT_RETRY_ERROR: "Network retry reconnect retry error.",
    MONGOOSE_DRIVER_RETRY_RECONNECT_RETRY_ERROR: "Driver retry reconnect retry error.",
    MONGOOSE_QUERY_RETRY_RECONNECT_RETRY_ERROR: "Query retry reconnect retry error.",
    MONGOOSE_MODEL_RETRY_RECONNECT_RETRY_ERROR: "Model retry reconnect retry error.",
    MONGOOSE_DOCUMENT_RETRY_RECONNECT_RETRY_ERROR: "Document retry reconnect retry error.",
    MONGOOSE_SCHEMA_RETRY_RECONNECT_RETRY_ERROR: "Schema retry reconnect retry error.",
    MONGOOSE_CONNECTION_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Connection retry reconnect retry timeout error.",
    MONGOOSE_NETWORK_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Network retry reconnect retry timeout error.",
    MONGOOSE_DRIVER_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Driver retry reconnect retry timeout error.",
    MONGOOSE_QUERY_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Query retry reconnect retry timeout error.",
    MONGOOSE_MODEL_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Model retry reconnect retry timeout error.",
    MONGOOSE_DOCUMENT_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Document retry reconnect retry timeout error.",
    MONGOOSE_SCHEMA_RETRY_RECONNECT_RETRY_TIMEOUT_ERROR: "Schema retry reconnect retry timeout error.",
    MONGOOSE_CONNECTION_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Connection retry reconnect retry reconnect error.",
    MONGOOSE_NETWORK_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Network retry reconnect retry reconnect error.",
    MONGOOSE_DRIVER_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Driver retry reconnect retry reconnect error.",
    MONGOOSE_QUERY_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Query retry reconnect retry reconnect error.",
    MONGOOSE_MODEL_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Model retry reconnect retry reconnect error.",
    MONGOOSE_DOCUMENT_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Document retry reconnect retry reconnect error.",
    MONGOOSE_SCHEMA_RETRY_RECONNECT_RETRY_RECONNECT_ERROR: "Schema retry reconnect retry reconnect error.",
    MONGOOSE_CONNECTION_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Connection retry reconnect retry reconnect timeout error.",
    MONGOOSE_NETWORK_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Network retry reconnect retry reconnect timeout error.",
    MONGOOSE_DRIVER_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Driver retry reconnect retry reconnect timeout error.",
    MONGOOSE_QUERY_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Query retry reconnect retry reconnect timeout error.",
    MONGOOSE_MODEL_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Model retry reconnect retry reconnect timeout error.",
    MONGOOSE_DOCUMENT_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Document retry reconnect retry reconnect timeout error.",
    MONGOOSE_SCHEMA_RETRY_RECONNECT_RETRY_RECONNECT_TIMEOUT_ERROR: "Schema retry reconnect retry reconnect timeout error.",
}

export const ServerErrors = {
    SERVER_STARTUP_ERROR: "Server startup error.",

}