import BaseService from './base.service.js';
import { invoiceRepository } from '../repositories/invoice.repository.js';

class InvoiceService extends BaseService {
  constructor() {
    super(invoiceRepository, 'invoice');
  }
}

export const invoiceService = new InvoiceService();
export default invoiceService;

