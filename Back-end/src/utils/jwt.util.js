// src/utils/jwt.util.js

import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        config.jwtAccessSecret,
        {
            expiresIn: config.jwtAccessExpiresIn,
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwtAccessSecret);
};