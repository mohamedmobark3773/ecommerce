
// src/middlewares/session.middleware.js

import config from "../config/config.js";

const sessionMiddleware = (req, res, next) => {
    req.session = req.session || {};
    next();
};

export default sessionMiddleware;
