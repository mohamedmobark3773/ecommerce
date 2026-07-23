import { verifyToken } from "../utils/token.js";
import { ApiError } from "../errors/app.error.js";
import asyncHandler from "./asyncHandler.middleware.js";
import { COOKIES, ROLES } from "../constants/auth.constants.js";

// Authenticate requests using Bearer token or accessToken cookie
export const authenticateUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const headerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const cookieToken = req.cookies && req.cookies[COOKIES.ACCESS_TOKEN] ? req.cookies[COOKIES.ACCESS_TOKEN] : null;
  const altHeader = req.headers["x-access-token"] || req.headers["x-auth-token"];

  const token = headerToken || cookieToken || altHeader;

  if (!token) {
    throw new ApiError(401, "Authentication required.");
  }

  try {
    const decoded = verifyToken(token, "access");

    if (!decoded || !decoded._id) {
      throw new ApiError(401, "Invalid or expired token.");
    }

    // Attach minimal user info expected by controllers
    req.user = {
      _id: decoded._id,
      role: decoded.role || ROLES.USER,
    };

    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token.");
  }
});

// Default check — used by admin/analytics routers expecting admin-only access
export const checkUserRole = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required.");
  }

  if (req.user.role !== ROLES.ADMIN && req.user.role !== ROLES.SUPER_ADMIN) {
    throw new ApiError(403, "Access denied.");
  }

  next();
};

// Factory for role-based checks when needed elsewhere
export const requireRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required.");
  }

  if (!allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, "You don't have permission to access this resource.");
  }

  next();
};

export default {
  authenticateUser,
  checkUserRole,
  requireRoles,
};
