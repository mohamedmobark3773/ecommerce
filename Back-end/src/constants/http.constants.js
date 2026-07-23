//src/constants/http.constants.js

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
}

export const HTTP_MESSAGES = {
    OK: "OK",
    CREATED: "Created",
    ACCEPTED: "Accepted",
    NO_CONTENT: "No Content",
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    METHOD_NOT_ALLOWED: "Method Not Allowed",
    NOT_ACCEPTABLE: "Not Acceptable",
    REQUEST_TIMEOUT: "Request Timeout",
    CONFLICT: "Conflict",
    GONE: "Gone",
    UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
    TOO_MANY_REQUESTS: "Too Many Requests",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    NOT_IMPLEMENTED: "Not Implemented",
    BAD_GATEWAY: "Bad Gateway",
    SERVICE_UNAVAILABLE: "Service Unavailable",
    GATEWAY_TIMEOUT: "Gateway Timeout",
    HTTP_VERSION_NOT_SUPPORTED: "HTTP Version Not Supported",
}

export const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
    HEAD: "HEAD",
    OPTIONS: "OPTIONS",
    TRACE: "TRACE",
    CONNECT: "CONNECT",
}

export const HTTP_CACHES = {
    CACHE_CONTROL: {
        NO_CACHE: "no-cache",
        NO_STORE: "no-store",
        PUBLIC: "public",
        PRIVATE: "private",
        MAX_AGE: "max-age",
    },
    CACHE_EXPIRES: {
        NEVER: "Thu, 01 Jan 1970 00:00:00 GMT",
        ONE_DAY: "Fri, 01 Aug 2025 00:00:00 GMT",
        ONE_WEEK: "Fri, 08 Aug 2025 00:00:00 GMT",
        ONE_MONTH: "Fri, 01 Sep 2025 00:00:00 GMT",
        ONE_YEAR: "Fri, 01 Aug 2026 00:00:00 GMT",
    },
    CACHE_ETAG: "ETag",
    CACHE_LAST_MODIFIED: "Last-Modified",
    CACHE_VARY: "Vary",
}

export const HTTP_MIME_TYPES = {
    JSON: "application/json",
    XML: "application/xml",
    HTML: "text/html",
    CSS: "text/css",
    JAVASCRIPT: "application/javascript",
    
}   