//src/constants/notification.constants.js

export const NotificationTypes = {
    EMAIL: "email",
    SMS: "sms",
    PUSH: "push",
    IN_APP: "in_app",
}

export const NotificationEventTriggers = {
    
    USER_CREATED: "USER_CREATED",
    USER_UPDATED: "USER_UPDATED",
    USER_DELETED: "USER_DELETED",
    USER_LOGGED_IN: "USER_LOGGED_IN",
    USER_LOGGED_OUT: "USER_LOGGED_OUT",
    USER_PASSWORD_CHANGED: "USER_PASSWORD_CHANGED",
    USER_EMAIL_CHANGED: "USER_EMAIL_CHANGED",
    USER_PHONE_CHANGED: "USER_PHONE_CHANGED",
    USER_ADDRESS_ADDED: "USER_ADDRESS_ADDED",
    USER_ADDRESS_UPDATED: "USER_ADDRESS_UPDATED",
    USER_ADDRESS_DELETED: "USER_ADDRESS_DELETED",
}

export const NotificationEventNames = {
    EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
    PHONE_VERIFICATION: "PHONE_VERIFICATION",
    PASSWORD_RESET: "PASSWORD_RESET",
    PASSWORD_CHANGED: "PASSWORD_CHANGED",
    EMAIL_CHANGED: "EMAIL_CHANGED",
    PHONE_CHANGED: "PHONE_CHANGED",
    ADDRESS_ADDED: "ADDRESS_ADDED",
    ADDRESS_UPDATED: "ADDRESS_UPDATED",
    ADDRESS_DELETED: "ADDRESS_DELETED",
}

export const NotificationEventPayloads = {
    EMAIL_VERIFICATION: {
        to: "email",
        subject: "Email Verification",
        text: "Please verify your email",
    },
    PHONE_VERIFICATION: {
        to: "phone",
        subject: "Phone Verification",
        text: "Please verify your phone",
    },
    PASSWORD_RESET: {
        to: "email",
        subject: "Password Reset",
        text: "Please reset your password",
    },
    PASSWORD_CHANGED: {
        to: "email",
        subject: "Password Changed",
        text: "Your password has been changed",
    },
    EMAIL_CHANGED: {
        to: "email",
        subject: "Email Changed",
        text: "Your email has been changed",
    },
    PHONE_CHANGED: {
        to: "phone",
        subject: "Phone Changed",
        text: "Your phone has been changed",
    },
    ADDRESS_ADDED: {
        to: "email",
        subject: "Address Added",
        text: "Your address has been added",
    },
    ADDRESS_UPDATED: {
        to: "email",
        subject: "Address Updated",
        text: "Your address has been updated",
    },
    ADDRESS_DELETED: {
        to: "email",
        subject: "Address Deleted",
        text: "Your address has been deleted",
    },
}   
