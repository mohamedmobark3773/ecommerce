import { Router } from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} from "./messages.controller.js";
import { createMessageValidator, updateMessageValidator, messageIdValidator } from "./messages.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createMessageValidator, validate, createMessage)
  .get(getMessages);

router.route("/:messageId")
  .get(messageIdValidator, getMessageById)
  .put(messageIdValidator, updateMessageValidator, validate, updateMessage)
  .delete(messageIdValidator, deleteMessage);

export default router;

