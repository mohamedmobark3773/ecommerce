import { paymentsRepository } from "./payments.repository.js";
import { PaymentDTO } from "./payments.dto.js";

class PaymentsService {
  async createPayment(paymentData) {
    const formattedData = PaymentDTO.toDatabase(paymentData);
    const payment = await paymentsRepository.create(formattedData);
    return PaymentDTO.transform(payment);
  }

  async getPayments(query = {}) {
    const filter = {};
    const options = {};

    if (query.user) filter.user = query.user;
    if (query.order) filter.order = query.order;
    if (query.paymentMethod) filter.paymentMethod = query.paymentMethod;
    if (query.status) filter.status = query.status;

    if (query.search) {
      filter.$or = [
        { transactionId: { $regex: query.search, $options: "i" } },
        { currency: { $regex: query.search, $options: "i" } },
      ];
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await paymentsRepository.findAll(filter, options);
    return {
      ...result,
      payments: PaymentDTO.transform(result.payments),
    };
  }

  async getPaymentById(paymentId) {
    const payment = await paymentsRepository.findById(paymentId);
    return PaymentDTO.transform(payment);
  }

  async updatePayment(paymentId, paymentData) {
    const formattedData = PaymentDTO.toDatabase(paymentData);
    const payment = await paymentsRepository.update(paymentId, formattedData);
    return PaymentDTO.transform(payment);
  }

  async deletePayment(paymentId) {
    const payment = await paymentsRepository.delete(paymentId);
    return PaymentDTO.transform(payment);
  }
}

export const paymentsService = new PaymentsService();

