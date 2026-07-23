import BaseService from './base.service.js';
import { supportTicketRepository } from '../repositories/supportTicket.repository.js';

class SupportTicketService extends BaseService {
  constructor() {
    super(supportTicketRepository, 'support ticket');
  }
}

export const supportTicketService = new SupportTicketService();
export default supportTicketService;

