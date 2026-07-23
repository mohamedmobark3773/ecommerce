import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser,
  logoutUser,
} from "./auth.controller.js";
import {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
} from "./auth.validator.js";

const router = Router();

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.post("/refresh", refreshTokenValidator, validate, refreshAccessToken);

// Protected routes
router.get("/me", authenticateUser, getCurrentUser);
router.post("/logout", authenticateUser, logoutUser);

export default router;
