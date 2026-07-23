// src/middlewares/localization.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";

import i18next from "../config/i18next.config.js";
import config from "../config/config.js";

const localizationMiddleware = asyncHandler(async (req, res, next) => {

    const languageHeader = req.headers["accept-language"] || "";

    const language = languageHeader.split(",")[0].split("-")[0];

    const supportedLanguages = config.supportedLanguages;

    const currentLanguage = supportedLanguages.includes(language)
        ? language
        : config.defaultLanguage;
        
    req.language = currentLanguage;

    req.t = (key, options = {}) =>
        i18next.t(key, {
            lng: currentLanguage,
            ...options
        });

    res.setHeader("Content-Language", currentLanguage);

    next();

});

export default localizationMiddleware;