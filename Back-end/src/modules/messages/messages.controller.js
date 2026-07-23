import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { messagesService } from "./messages.service.js";

export const createMessage = asyncHandler(async (req, res) => {
  const message = await messagesService.createMessage(req.body);

  return res.status(201).json({
    success: true,
    message: "Message created successfully.",
    data: message,
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const result = await messagesService.getMessages(req.query);

  return res.status(200).json({
    success: true,
    message: "Messages retrieved successfully.",
    data: result,
  });
});

export const getMessageById = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const message = await messagesService.getMessageById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Message retrieved successfully.",
    data: message,
  });
});

export const updateMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const message = await messagesService.updateMessage(messageId, req.body);

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Message updated successfully.",
    data: message,
  });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const message = await messagesService.deleteMessage(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
    data: message,
  });
});

