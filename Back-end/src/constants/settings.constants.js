//src/constants/settings.constants.js

export const SETTINGS = {
    "SITE_NAME": "Ecommerce",
    "SITE_DESCRIPTION": "Ecommerce",
    "SITE_LOGO": "https://example.com/logo.png",
    "SITE_FAVICON": "https://example.com/favicon.png",
    "SITE_URL": "https://example.com",
}

export const SETTINGS_KEYS = Object.keys(SETTINGS);
export const SETTINGS_VALUES = Object.values(SETTINGS);
export const SETTINGS_ENTRIES = Object.entries(SETTINGS);



export const SETTINGS_MESSAGES = {
    "SITE_NAME": "Site name",
    "SITE_DESCRIPTION": "Site description",
    "SITE_LOGO": "Site logo",
    "SITE_FAVICON": "Site favicon",
    "SITE_URL": "Site url",
}

export const SETTINGS_DESCRIPTIONS = {
    "SITE_NAME": "Site name",
    "SITE_DESCRIPTION": "Site description",
    "SITE_LOGO": "Site logo",
    "SITE_FAVICON": "Site favicon",
    "SITE_URL": "Site url",
}

export const SETTINGS_VALIDATION_CONSTANTS = {
    "SITE_NAME_MAX_LENGTH": 100,
    "SITE_DESCRIPTION_MAX_LENGTH": 500,
    "SITE_URL_MAX_LENGTH": 255,
}

export const SETTINGS_EVENT_TRIGGERS = {
    "SITE_NAME_UPDATED": "SITE_NAME_UPDATED",
    "SITE_DESCRIPTION_UPDATED": "SITE_DESCRIPTION_UPDATED",
    "SITE_LOGO_UPDATED": "SITE_LOGO_UPDATED",
    "SITE_FAVICON_UPDATED": "SITE_FAVICON_UPDATED",
    "SITE_URL_UPDATED": "SITE_URL_UPDATED",
}

export const SETTINGS_EVENT_NAMES = {
    "SITE_NAME_UPDATED": "SITE_NAME_UPDATED",
    "SITE_DESCRIPTION_UPDATED": "SITE_DESCRIPTION_UPDATED",
    "SITE_LOGO_UPDATED": "SITE_LOGO_UPDATED",
    "SITE_FAVICON_UPDATED": "SITE_FAVICON_UPDATED",
    "SITE_URL_UPDATED": "SITE_URL_UPDATED",
}

export const SETTINGS_EVENT_MESSAGES = {
    "SITE_NAME_UPDATED": "Site name updated successfully.",
    "SITE_DESCRIPTION_UPDATED": "Site description updated successfully.",
    "SITE_LOGO_UPDATED": "Site logo updated successfully.",
    "SITE_FAVICON_UPDATED": "Site favicon updated successfully.",
    "SITE_URL_UPDATED": "Site url updated successfully.",
}
