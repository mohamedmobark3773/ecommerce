import jwt from "jsonwebtoken";
import config from "../config/config.js";

const tokenConfig = {
    access: {
        secret: config.jwtAccessSecret,
        expiresIn: config.jwtAccessExpiresIn || "15m",
    },
    refresh: {
        secret: config.jwtRefreshSecret,
        expiresIn: config.jwtRefreshExpiresIn || "7d",
    },
};

const getTokenConfig = (type) => {

    const options = tokenConfig[type];

    if (!options) {
        throw new Error("Invalid token type.");
    }

    return options;

};

export const generateToken = (payload, type = "access") => {

    const { secret, expiresIn } = getTokenConfig(type);

    return jwt.sign(payload, secret, {
        expiresIn,
    });

};

export const verifyToken = (token, type = "access") => {

    try {

        const { secret } = getTokenConfig(type);

        return jwt.verify(token, secret);

    } catch (error) {

        if (error instanceof Error) {
            error.message = "Invalid or expired token.";
        }

        throw error;

    }

};

export const decodeToken = (token) => {

    return jwt.decode(token);

};

export default {

    generateToken,

    verifyToken,

    decodeToken,

};