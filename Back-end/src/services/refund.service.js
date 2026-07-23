import BaseService from './base.service.js';
import { refundRepository } from '../repositories/refund.repository.js';

class RefundService extends BaseService {
  constructor() {
    super(refundRepository, 'refund');
  }
}

export const refundService = new RefundService();
export default refundService;

