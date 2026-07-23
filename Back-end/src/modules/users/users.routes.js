import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./users.controller.js";
import { createUserValidator, updateUserValidator, userIdValidator } from "./users.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createUserValidator, validate, createUser)
  .get(getUsers);

router.route("/:userId")
  .get(userIdValidator, getUserById)
  .put(userIdValidator, updateUserValidator, updateUser)
  .delete(userIdValidator, deleteUser);

export default router;

