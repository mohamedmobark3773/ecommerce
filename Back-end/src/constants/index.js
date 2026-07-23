// src/constants/index.js

export const AuthenticationErrors = {
    INVALID_CREDENTIALS: "Invalid email or password.",
    UNAUTHORIZED: "Unauthorized.",
    FORBIDDEN: "Access denied.",
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
}

export const AuthenticationEvents = {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    USER_PASSWORD_RESET: "USER_PASSWORD_RESET",
    USER_PASSWORD_CHANGE: "USER_PASSWORD_CHANGE",
    USER_EMAIL_VERIFICATION: "USER_EMAIL_VERIFICATION",
    USER_PHONE_VERIFICATION: "USER_PHONE_VERIFICATION",
    USER_REGISTRATION: "USER_REGISTRATION",
    USER_FORGOT_PASSWORD: "USER_FORGOT_PASSWORD",
    USER_RESET_PASSWORD: "USER_RESET_PASSWORD",
}

export const AuthenticationHttpConstants = {
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",
    PASSWORD_RESET_SUCCESS: "Password reset successful.",
    PASSWORD_CHANGE_SUCCESS: "Password change successful.",
    EMAIL_VERIFICATION_SUCCESS: "Email verification successful.",
    PHONE_VERIFICATION_SUCCESS: "Phone verification successful.",
    REGISTRATION_SUCCESS: "Registration successful.",
    FORGOT_PASSWORD_SUCCESS: "Forgot password successful.",
    RESET_PASSWORD_SUCCESS: "Reset password successful.",
}           

export const AuthenticationValidationConstants = {
    EMAIL_INVALID: "Email is invalid.",
    PASSWORD_INVALID: "Password is invalid.",
    PHONE_INVALID: "Phone is invalid.",
    ADDRESS_INVALID: "Address is invalid.",
    
}       
export const AuthenticationConstants = {
    ...AuthenticationErrors,
    ...AuthenticationEvents,
    ...AuthenticationHttpConstants,
    ...AuthenticationValidationConstants,
}           