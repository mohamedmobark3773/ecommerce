import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import {
  createChat,
  getChats,
  getChatById,
  sendMessage,
  markChatAsRead,
  deleteChat,
} from "./chat.controller.js";
import { createChatValidator, sendMessageValidator, chatIdValidator } from "./chat.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.use(authenticateUser);

router.route("/")
  .post(createChatValidator, validate, createChat)
  .get(getChats);

router.route("/:chatId")
  .get(chatIdValidator, getChatById)
  .delete(chatIdValidator, deleteChat);

router.post("/:chatId/messages", chatIdValidator, sendMessageValidator, validate, sendMessage);
router.patch("/:chatId/read", chatIdValidator, validate, markChatAsRead);

export default router;

