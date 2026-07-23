import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Invoice } from '../models/invoice.model.js';

export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.create(req.body);
  return res.status(201).json({ success: true, message: 'Invoice created successfully.', data: invoice });
});

export const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find(req.query);
  return res.status(200).json({ success: true, message: 'Invoices retrieved successfully.', data: invoices });
});

export const getInvoiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findById(id);
  if (!invoice) throw new ApiError(404, 'Invoice not found.');
  return res.status(200).json({ success: true, message: 'Invoice retrieved successfully.', data: invoice });
});

export const updateInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!invoice) throw new ApiError(404, 'Invoice not found.');
  return res.status(200).json({ success: true, message: 'Invoice updated successfully.', data: invoice });
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findByIdAndDelete(id);
  if (!invoice) throw new ApiError(404, 'Invoice not found.');
  return res.status(200).json({ success: true, message: 'Invoice deleted successfully.' });
});

