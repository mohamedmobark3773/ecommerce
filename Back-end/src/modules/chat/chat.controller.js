import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { chatService } from "./chat.service.js";

export const createChat = asyncHandler(async (req, res) => {
  const chat = await chatService.createChat(req.user._id, req.body);

  return res.status(201).json({
    success: true,
    message: "Chat created successfully.",
    data: chat,
  });
});

export const getChats = asyncHandler(async (req, res) => {
  const result = await chatService.getChats(req.user._id, req.query);

  return res.status(200).json({
    success: true,
    message: "Chats retrieved successfully.",
    data: result,
  });
});

export const getChatById = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await chatService.getChatById(chatId, req.user._id);

  if (!chat) {
    throw new ApiError(404, "Chat not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Chat retrieved successfully.",
    data: chat,
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await chatService.sendMessage(chatId, req.user._id, req.body);

  if (!chat) {
    throw new ApiError(404, "Chat not found.");
  }

  return res.status(201).json({
    success: true,
    message: "Message sent successfully.",
    data: chat,
  });
});

export const markChatAsRead = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await chatService.markChatAsRead(chatId, req.user._id);

  if (!chat) {
    throw new ApiError(404, "Chat not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Chat marked as read.",
    data: chat,
  });
});

export const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await chatService.deleteChat(chatId, req.user._id);

  if (!chat) {
    throw new ApiError(404, "Chat not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully.",
    data: chat,
  });
});

