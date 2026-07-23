// src/middlewares/rbac.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";

import ApiError from "../utils/apiError.util.js";
import Constants from "../utils/constant.util.js";

const rbacMiddleware = (...allowedRoles) => {

    return asyncHandler(async (req, res, next) => {

        const user = req.user;

        if (!user) {

            throw new ApiError(
                Constants.StatusCodes.UNAUTHORIZED,
                "Authentication required."
            );

        }

        if (!allowedRoles.includes(user.role)) {

            throw new ApiError(
                Constants.StatusCodes.FORBIDDEN,
                "You don't have permission to access this resource."
            );

        }

        next();

    });

};

export default rbacMiddleware;