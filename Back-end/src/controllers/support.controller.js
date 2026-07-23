import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { SupportTicket } from '../models/supportTicket.model.js';

export const createSupportTicket = asyncHandler(async (req, res) => {
  const ticket = await SupportTicket.create(req.body);
  return res.status(201).json({ success: true, message: 'Support ticket created successfully.', data: ticket });
});

export const getSupportTickets = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find(req.query);
  return res.status(200).json({ success: true, message: 'Support tickets retrieved successfully.', data: tickets });
});

export const getSupportTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ticket = await SupportTicket.findById(id);
  if (!ticket) throw new ApiError(404, 'Support ticket not found.');
  return res.status(200).json({ success: true, message: 'Support ticket retrieved successfully.', data: ticket });
});

