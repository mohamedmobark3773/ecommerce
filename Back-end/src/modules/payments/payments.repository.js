import { Payment } from "./payments.model.js";

class PaymentsRepository {
  async create(paymentData) {
    return await Payment.create(paymentData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find(filter).sort(sort).skip(skip).limit(limit).populate("order user"),
      Payment.countDocuments(filter),
    ]);

    return {
      payments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(paymentId) {
    return await Payment.findById(paymentId).populate("order user");
  }

  async update(paymentId, paymentData) {
    return await Payment.findByIdAndUpdate(paymentId, { $set: paymentData }, { new: true, runValidators: true }).populate("order user");
  }

  async delete(paymentId) {
    return await Payment.findByIdAndDelete(paymentId);
  }
}

export const paymentsRepository = new PaymentsRepository();

