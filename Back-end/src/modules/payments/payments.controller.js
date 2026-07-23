import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { paymentsService } from "./payments.service.js";

export const createPayment = asyncHandler(async (req, res) => {
  const payment = await paymentsService.createPayment({
    ...req.body,
    user: req.body.user || req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Payment created successfully.",
    data: payment,
  });
});

export const getPayments = asyncHandler(async (req, res) => {
  const result = await paymentsService.getPayments(req.query);

  return res.status(200).json({
    success: true,
    message: "Payments retrieved successfully.",
    data: result,
  });
});

export const getPaymentById = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const payment = await paymentsService.getPaymentById(paymentId);

  if (!payment) {
    throw new ApiError(404, "Payment not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Payment retrieved successfully.",
    data: payment,
  });
});

export const updatePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const payment = await paymentsService.updatePayment(paymentId, req.body);

  if (!payment) {
    throw new ApiError(404, "Payment not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Payment updated successfully.",
    data: payment,
  });
});

export const deletePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const payment = await paymentsService.deletePayment(paymentId);

  if (!payment) {
    throw new ApiError(404, "Payment not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Payment deleted successfully.",
    data: payment,
  });
});

